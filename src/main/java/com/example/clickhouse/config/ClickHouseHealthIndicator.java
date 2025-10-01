package com.example.clickhouse.config;

import com.example.clickhouse.datasource.ClickHouseShard;
import com.example.clickhouse.datasource.ShardedClickHouseDataSource;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;

import java.util.HashMap;
import java.util.Map;

/**
 * Health indicator for ClickHouse sharded data source
 */
public class ClickHouseHealthIndicator implements HealthIndicator {
    
    private final ShardedClickHouseDataSource dataSource;
    
    public ClickHouseHealthIndicator(ShardedClickHouseDataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    @Override
    public Health health() {
        try {
            ShardedClickHouseDataSource.DataSourceStats stats = dataSource.getStats();
            
            long healthyShards = stats.getHealthyShardsCount();
            long totalShards = stats.shardStats().size();
            
            Health.Builder builder = healthyShards > 0 ? Health.up() : Health.down();
            
            // Overall statistics
            builder.withDetail("totalShards", totalShards)
                   .withDetail("healthyShards", healthyShards)
                   .withDetail("successRate", String.format("%.2f%%", stats.getSuccessRate() * 100))
                   .withDetail("totalConnectionAttempts", stats.totalConnectionAttempts())
                   .withDetail("successfulConnections", stats.successfulConnections())
                   .withDetail("failedConnections", stats.failedConnections())
                   .withDetail("totalActiveConnections", stats.getTotalActiveConnections());
            
            // Load balancer statistics
            var lbStats = stats.loadBalancerStats();
            Map<String, Object> loadBalancerInfo = new HashMap<>();
            loadBalancerInfo.put("healthyShardsCount", lbStats.healthyShardsCount());
            loadBalancerInfo.put("totalWeightedSlots", lbStats.totalWeightedSlots());
            loadBalancerInfo.put("currentIndex", lbStats.currentIndex());
            loadBalancerInfo.put("totalWeight", lbStats.totalWeight());
            builder.withDetail("loadBalancer", loadBalancerInfo);
            
            // Individual shard statistics
            Map<String, Object> shardDetails = new HashMap<>();
            for (ClickHouseShard.ShardStats shardStat : stats.shardStats()) {
                Map<String, Object> shardInfo = new HashMap<>();
                shardInfo.put("url", shardStat.url());
                shardInfo.put("healthy", shardStat.healthy());
                shardInfo.put("weight", shardStat.weight());
                shardInfo.put("failureCount", shardStat.failureCount());
                shardInfo.put("lastFailure", shardStat.lastFailure());
                shardInfo.put("lastHealthCheck", shardStat.lastHealthCheck());
                shardInfo.put("activeConnections", shardStat.activeConnections());
                shardInfo.put("idleConnections", shardStat.idleConnections());
                shardInfo.put("totalConnections", shardStat.totalConnections());
                
                shardDetails.put(shardStat.name(), shardInfo);
            }
            builder.withDetail("shards", shardDetails);
            
            return builder.build();
            
        } catch (Exception e) {
            return Health.down()
                         .withDetail("error", e.getMessage())
                         .withException(e)
                         .build();
        }
    }
}