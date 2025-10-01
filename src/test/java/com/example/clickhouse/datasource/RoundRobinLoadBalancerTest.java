package com.example.clickhouse.datasource;

import com.example.clickhouse.config.ClickHouseShardProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RoundRobinLoadBalancerTest {

    @Mock
    private ClickHouseShard shard1;
    
    @Mock
    private ClickHouseShard shard2;
    
    @Mock
    private ClickHouseShard shard3;

    private RoundRobinLoadBalancer loadBalancer;
    private ClickHouseShardProperties.HikariConfig hikariConfig;

    @BeforeEach
    void setUp() {
        hikariConfig = new ClickHouseShardProperties.HikariConfig(5, 10, Duration.ofMinutes(10), Duration.ofMinutes(5));
        
        when(shard1.getName()).thenReturn("shard1");
        when(shard1.getWeight()).thenReturn(2);
        when(shard1.isHealthy()).thenReturn(true);
        
        when(shard2.getName()).thenReturn("shard2");
        when(shard2.getWeight()).thenReturn(1);
        when(shard2.isHealthy()).thenReturn(true);
        
        when(shard3.getName()).thenReturn("shard3");
        when(shard3.getWeight()).thenReturn(1);
        when(shard3.isHealthy()).thenReturn(false);
        
        loadBalancer = new RoundRobinLoadBalancer(List.of(shard1, shard2, shard3));
    }

    @Test
    void shouldReturnHealthyShardsOnly() {
        List<ClickHouseShard> healthyShards = loadBalancer.getHealthyShards();
        
        assertThat(healthyShards).hasSize(2);
        assertThat(healthyShards).containsExactlyInAnyOrder(shard1, shard2);
    }

    @Test
    void shouldRespectWeights() {
        // Test multiple selections to verify weight distribution
        Map<String, Integer> selections = Map.of(
            "shard1", 0,
            "shard2", 0
        );
        
        // Select 100 times and count selections
        for (int i = 0; i < 100; i++) {
            ClickHouseShard selected = loadBalancer.getNextShard();
            assertThat(selected).isNotNull();
            selections.merge(selected.getName(), 1, Integer::sum);
        }
        
        // shard1 has weight 2, shard2 has weight 1
        // So shard1 should be selected approximately twice as often
        int shard1Selections = selections.get("shard1");
        int shard2Selections = selections.get("shard2");
        
        assertThat(shard1Selections).isGreaterThan(shard2Selections);
        // Allow some variance due to shuffling
        assertThat((double) shard1Selections / shard2Selections).isBetween(1.5, 2.5);
    }

    @Test
    void shouldUpdateHealthyShards() {
        // Initially shard3 is unhealthy
        assertThat(loadBalancer.getHealthyShards()).hasSize(2);
        
        // Make shard3 healthy
        when(shard3.isHealthy()).thenReturn(true);
        loadBalancer.updateHealthyShards(List.of(shard1, shard2, shard3));
        
        assertThat(loadBalancer.getHealthyShards()).hasSize(3);
        assertThat(loadBalancer.getHealthyShards()).contains(shard3);
    }

    @Test
    void shouldFallbackToAllShardsWhenNoneHealthy() {
        when(shard1.isHealthy()).thenReturn(false);
        when(shard2.isHealthy()).thenReturn(false);
        when(shard3.isHealthy()).thenReturn(false);
        
        loadBalancer.updateHealthyShards(List.of(shard1, shard2, shard3));
        
        // Should fallback to all shards
        assertThat(loadBalancer.getHealthyShards()).hasSize(3);
    }

    @Test
    void shouldReturnNullWhenNoShards() {
        RoundRobinLoadBalancer emptyBalancer = new RoundRobinLoadBalancer(List.of());
        
        assertThat(emptyBalancer.getNextShard()).isNull();
    }

    @Test
    void shouldProvideStats() {
        RoundRobinLoadBalancer.LoadBalancerStats stats = loadBalancer.getStats();
        
        assertThat(stats.healthyShardsCount()).isEqualTo(2);
        assertThat(stats.totalWeight()).isEqualTo(3); // shard1(2) + shard2(1)
        assertThat(stats.totalWeightedSlots()).isEqualTo(3);
    }
}