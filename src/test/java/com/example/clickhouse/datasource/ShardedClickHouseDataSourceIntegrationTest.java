package com.example.clickhouse.datasource;

import com.example.clickhouse.config.ClickHouseShardProperties;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.clickhouse.ClickHouseContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@Testcontainers
@SpringBootTest
class ShardedClickHouseDataSourceIntegrationTest {

    @Container
    static ClickHouseContainer clickhouse1 = new ClickHouseContainer("clickhouse/clickhouse-server:23.8")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");

    @Container
    static ClickHouseContainer clickhouse2 = new ClickHouseContainer("clickhouse/clickhouse-server:23.8")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("clickhouse.shards.shards[0].name", () -> "shard1");
        registry.add("clickhouse.shards.shards[0].url", clickhouse1::getJdbcUrl);
        registry.add("clickhouse.shards.shards[0].username", clickhouse1::getUsername);
        registry.add("clickhouse.shards.shards[0].password", clickhouse1::getPassword);
        registry.add("clickhouse.shards.shards[0].weight", () -> 2);
        registry.add("clickhouse.shards.shards[0].enabled", () -> true);

        registry.add("clickhouse.shards.shards[1].name", () -> "shard2");
        registry.add("clickhouse.shards.shards[1].url", clickhouse2::getJdbcUrl);
        registry.add("clickhouse.shards.shards[1].username", clickhouse2::getUsername);
        registry.add("clickhouse.shards.shards[1].password", clickhouse2::getPassword);
        registry.add("clickhouse.shards.shards[1].weight", () -> 1);
        registry.add("clickhouse.shards.shards[1].enabled", () -> true);

        registry.add("clickhouse.shards.health-check-interval", () -> "PT5S");
        registry.add("clickhouse.shards.connection-timeout", () -> "PT10S");
        registry.add("clickhouse.shards.read-timeout", () -> "PT30S");
        registry.add("clickhouse.shards.max-retries", () -> 3);
        registry.add("clickhouse.shards.retry-delay", () -> "PT0.5S");
    }

    @Test
    void shouldCreateDataSourceWithMultipleShards() {
        ClickHouseShardProperties.ShardConfig shard1Config = new ClickHouseShardProperties.ShardConfig(
                "shard1", clickhouse1.getJdbcUrl(), clickhouse1.getUsername(), clickhouse1.getPassword(),
                2, true, Map.of()
        );

        ClickHouseShardProperties.ShardConfig shard2Config = new ClickHouseShardProperties.ShardConfig(
                "shard2", clickhouse2.getJdbcUrl(), clickhouse2.getUsername(), clickhouse2.getPassword(),
                1, true, Map.of()
        );

        ClickHouseShardProperties.HikariConfig hikariConfig = new ClickHouseShardProperties.HikariConfig(
                2, 5, Duration.ofMinutes(10), Duration.ofMinutes(5)
        );

        ClickHouseShardProperties properties = new ClickHouseShardProperties(
                List.of(shard1Config, shard2Config),
                Duration.ofSeconds(30),
                Duration.ofSeconds(10),
                Duration.ofSeconds(30),
                3,
                Duration.ofMillis(500),
                hikariConfig
        );

        try (ShardedClickHouseDataSource dataSource = new ShardedClickHouseDataSource(properties)) {
            dataSource.afterPropertiesSet();

            assertThat(dataSource.getAllShards()).hasSize(2);
            assertThat(dataSource.getShard("shard1")).isNotNull();
            assertThat(dataSource.getShard("shard2")).isNotNull();
        }
    }

    @Test
    void shouldExecuteQueriesOnDifferentShards() throws SQLException {
        ClickHouseShardProperties.ShardConfig shard1Config = new ClickHouseShardProperties.ShardConfig(
                "shard1", clickhouse1.getJdbcUrl(), clickhouse1.getUsername(), clickhouse1.getPassword(),
                1, true, Map.of()
        );

        ClickHouseShardProperties.ShardConfig shard2Config = new ClickHouseShardProperties.ShardConfig(
                "shard2", clickhouse2.getJdbcUrl(), clickhouse2.getUsername(), clickhouse2.getPassword(),
                1, true, Map.of()
        );

        ClickHouseShardProperties.HikariConfig hikariConfig = new ClickHouseShardProperties.HikariConfig(
                2, 5, Duration.ofMinutes(10), Duration.ofMinutes(5)
        );

        ClickHouseShardProperties properties = new ClickHouseShardProperties(
                List.of(shard1Config, shard2Config),
                Duration.ofSeconds(30),
                Duration.ofSeconds(10),
                Duration.ofSeconds(30),
                3,
                Duration.ofMillis(500),
                hikariConfig
        );

        try (ShardedClickHouseDataSource dataSource = new ShardedClickHouseDataSource(properties)) {
            dataSource.afterPropertiesSet();

            // Execute queries and verify they work
            for (int i = 0; i < 10; i++) {
                try (Connection conn = dataSource.getConnection();
                     Statement stmt = conn.createStatement();
                     ResultSet rs = stmt.executeQuery("SELECT 1 as test_value")) {

                    assertThat(rs.next()).isTrue();
                    assertThat(rs.getInt("test_value")).isEqualTo(1);
                }
            }

            // Verify statistics
            ShardedClickHouseDataSource.DataSourceStats stats = dataSource.getStats();
            assertThat(stats.totalConnectionAttempts()).isEqualTo(10);
            assertThat(stats.successfulConnections()).isEqualTo(10);
            assertThat(stats.failedConnections()).isEqualTo(0);
            assertThat(stats.getSuccessRate()).isEqualTo(1.0);
        }
    }

    @Test
    void shouldHandleShardFailure() throws SQLException {
        // Create a configuration with one invalid shard
        ClickHouseShardProperties.ShardConfig validShard = new ClickHouseShardProperties.ShardConfig(
                "valid", clickhouse1.getJdbcUrl(), clickhouse1.getUsername(), clickhouse1.getPassword(),
                1, true, Map.of()
        );

        ClickHouseShardProperties.ShardConfig invalidShard = new ClickHouseShardProperties.ShardConfig(
                "invalid", "jdbc:clickhouse://invalid-host:8123/test", "test", "test",
                1, true, Map.of()
        );

        ClickHouseShardProperties.HikariConfig hikariConfig = new ClickHouseShardProperties.HikariConfig(
                1, 2, Duration.ofMinutes(10), Duration.ofMinutes(5)
        );

        ClickHouseShardProperties properties = new ClickHouseShardProperties(
                List.of(validShard, invalidShard),
                Duration.ofSeconds(5),
                Duration.ofSeconds(2),
                Duration.ofSeconds(5),
                2,
                Duration.ofMillis(100),
                hikariConfig
        );

        try (ShardedClickHouseDataSource dataSource = new ShardedClickHouseDataSource(properties)) {
            dataSource.afterPropertiesSet();

            // Should still be able to get connections from valid shard
            try (Connection conn = dataSource.getConnection();
                 Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT 1")) {

                assertThat(rs.next()).isTrue();
                assertThat(rs.getInt(1)).isEqualTo(1);
            }

            // Verify that invalid shard is marked as unhealthy
            Thread.sleep(6000); // Wait for health check
            
            ShardedClickHouseDataSource.DataSourceStats stats = dataSource.getStats();
            assertThat(stats.getHealthyShardsCount()).isEqualTo(1);
            
            // Find the invalid shard stats
            var invalidShardStats = stats.shardStats().stream()
                    .filter(s -> s.name().equals("invalid"))
                    .findFirst();
            
            assertThat(invalidShardStats).isPresent();
            assertThat(invalidShardStats.get().healthy()).isFalse();
            assertThat(invalidShardStats.get().failureCount()).isGreaterThan(0);
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @Test
    void shouldFailWhenAllShardsDown() {
        ClickHouseShardProperties.ShardConfig invalidShard1 = new ClickHouseShardProperties.ShardConfig(
                "invalid1", "jdbc:clickhouse://invalid-host1:8123/test", "test", "test",
                1, true, Map.of()
        );

        ClickHouseShardProperties.ShardConfig invalidShard2 = new ClickHouseShardProperties.ShardConfig(
                "invalid2", "jdbc:clickhouse://invalid-host2:8123/test", "test", "test",
                1, true, Map.of()
        );

        ClickHouseShardProperties.HikariConfig hikariConfig = new ClickHouseShardProperties.HikariConfig(
                1, 2, Duration.ofMinutes(10), Duration.ofMinutes(5)
        );

        ClickHouseShardProperties properties = new ClickHouseShardProperties(
                List.of(invalidShard1, invalidShard2),
                Duration.ofSeconds(30),
                Duration.ofSeconds(1),
                Duration.ofSeconds(5),
                2,
                Duration.ofMillis(100),
                hikariConfig
        );

        try (ShardedClickHouseDataSource dataSource = new ShardedClickHouseDataSource(properties)) {
            dataSource.afterPropertiesSet();

            // Should fail to get connection
            assertThatThrownBy(dataSource::getConnection)
                    .isInstanceOf(SQLException.class)
                    .hasMessageContaining("Failed to obtain connection after");
        }
    }
}