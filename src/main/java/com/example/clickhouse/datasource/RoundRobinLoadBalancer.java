package com.example.clickhouse.datasource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.IntStream;

/**
 * Round-robin load balancer with weighted distribution for ClickHouse shards
 */
public class RoundRobinLoadBalancer {
    
    private static final Logger logger = LoggerFactory.getLogger(RoundRobinLoadBalancer.class);
    
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private volatile List<ClickHouseShard> healthyShards;
    private volatile int[] weightedIndices;
    private final AtomicInteger currentIndex = new AtomicInteger(0);
    
    public RoundRobinLoadBalancer(List<ClickHouseShard> shards) {
        updateHealthyShards(shards);
    }
    
    /**
     * Get the next shard using round-robin with weights
     */
    public ClickHouseShard getNextShard() {
        lock.readLock().lock();
        try {
            if (weightedIndices == null || weightedIndices.length == 0) {
                logger.warn("No healthy shards available");
                return null;
            }
            
            int index = currentIndex.getAndIncrement() % weightedIndices.length;
            int shardIndex = weightedIndices[index];
            
            ClickHouseShard shard = healthyShards.get(shardIndex);
            logger.debug("Selected shard '{}' (index: {}, weighted index: {})", 
                        shard.getName(), shardIndex, index);
            
            return shard;
        } finally {
            lock.readLock().unlock();
        }
    }
    
    /**
     * Update the list of healthy shards and recalculate weighted indices
     */
    public void updateHealthyShards(List<ClickHouseShard> allShards) {
        lock.writeLock().lock();
        try {
            List<ClickHouseShard> newHealthyShards = allShards.stream()
                .filter(ClickHouseShard::isHealthy)
                .toList();
            
            if (newHealthyShards.isEmpty()) {
                logger.error("No healthy shards available! Using all shards as fallback.");
                newHealthyShards = allShards; // Fallback to all shards
            }
            
            this.healthyShards = newHealthyShards;
            this.weightedIndices = calculateWeightedIndices(newHealthyShards);
            
            logger.info("Updated healthy shards: {} out of {} total shards", 
                       newHealthyShards.size(), allShards.size());
            
            if (logger.isDebugEnabled()) {
                newHealthyShards.forEach(shard -> 
                    logger.debug("Healthy shard: '{}' (weight: {})", shard.getName(), shard.getWeight()));
            }
            
        } finally {
            lock.writeLock().unlock();
        }
    }
    
    /**
     * Calculate weighted indices for round-robin distribution
     * For example: shard A (weight=2), shard B (weight=1) -> [0, 0, 1]
     */
    private int[] calculateWeightedIndices(List<ClickHouseShard> shards) {
        if (shards.isEmpty()) {
            return new int[0];
        }
        
        int totalWeight = shards.stream()
            .mapToInt(ClickHouseShard::getWeight)
            .sum();
        
        int[] indices = new int[totalWeight];
        int currentPos = 0;
        
        for (int shardIndex = 0; shardIndex < shards.size(); shardIndex++) {
            ClickHouseShard shard = shards.get(shardIndex);
            int weight = shard.getWeight();
            
            // Fill the array with this shard's index, repeated 'weight' times
            for (int i = 0; i < weight; i++) {
                indices[currentPos++] = shardIndex;
            }
        }
        
        // Shuffle the indices to avoid clustering of the same shard
        shuffleArray(indices);
        
        logger.debug("Calculated weighted indices for {} shards with total weight {}", 
                    shards.size(), totalWeight);
        
        return indices;
    }
    
    /**
     * Fisher-Yates shuffle algorithm to distribute weighted indices more evenly
     */
    private void shuffleArray(int[] array) {
        for (int i = array.length - 1; i > 0; i--) {
            int j = (int) (Math.random() * (i + 1));
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    /**
     * Get current statistics about load balancing
     */
    public LoadBalancerStats getStats() {
        lock.readLock().lock();
        try {
            return new LoadBalancerStats(
                healthyShards != null ? healthyShards.size() : 0,
                weightedIndices != null ? weightedIndices.length : 0,
                currentIndex.get(),
                healthyShards != null ? 
                    healthyShards.stream().mapToInt(ClickHouseShard::getWeight).sum() : 0
            );
        } finally {
            lock.readLock().unlock();
        }
    }
    
    /**
     * Get all currently healthy shards
     */
    public List<ClickHouseShard> getHealthyShards() {
        lock.readLock().lock();
        try {
            return healthyShards != null ? List.copyOf(healthyShards) : List.of();
        } finally {
            lock.readLock().unlock();
        }
    }
    
    /**
     * Statistics record for load balancer
     */
    public record LoadBalancerStats(
        int healthyShardsCount,
        int totalWeightedSlots,
        int currentIndex,
        int totalWeight
    ) {}
}