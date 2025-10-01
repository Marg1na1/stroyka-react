package com.example.clickhouse.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * Configuration properties for ClickHouse shards
 */
@ConfigurationProperties(prefix = "clickhouse.shards")
public record ClickHouseShardProperties(
    List<ShardConfig> shards,
    Duration healthCheckInterval,
    Duration connectionTimeout,
    Duration readTimeout,
    int maxRetries,
    Duration retryDelay,
    HikariConfig hikari
) {
    
    public ClickHouseShardProperties {
        if (shards == null || shards.isEmpty()) {
            throw new IllegalArgumentException("At least one shard must be configured");
        }
        if (healthCheckInterval == null) {
            healthCheckInterval = Duration.ofSeconds(30);
        }
        if (connectionTimeout == null) {
            connectionTimeout = Duration.ofSeconds(10);
        }
        if (readTimeout == null) {
            readTimeout = Duration.ofSeconds(30);
        }
        if (maxRetries <= 0) {
            maxRetries = 3;
        }
        if (retryDelay == null) {
            retryDelay = Duration.ofMillis(500);
        }
        if (hikari == null) {
            hikari = new HikariConfig(10, 20, Duration.ofMinutes(10), Duration.ofMinutes(5));
        }
    }
    
    public record ShardConfig(
        String name,
        String url,
        String username,
        String password,
        int weight,
        boolean enabled,
        Map<String, String> properties
    ) {
        @ConstructorBinding
        public ShardConfig(String name, String url, String username, String password, 
                          Integer weight, Boolean enabled, Map<String, String> properties) {
            this(name, url, username, password, 
                 weight != null ? weight : 1,
                 enabled != null ? enabled : true,
                 properties != null ? properties : Map.of());
        }
        
        public ShardConfig {
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("Shard name cannot be null or blank");
            }
            if (url == null || url.isBlank()) {
                throw new IllegalArgumentException("Shard URL cannot be null or blank");
            }
            if (weight <= 0) {
                throw new IllegalArgumentException("Shard weight must be positive");
            }
        }
    }
    
    public record HikariConfig(
        int minimumIdle,
        int maximumPoolSize,
        Duration maxLifetime,
        Duration idleTimeout
    ) {
        public HikariConfig {
            if (minimumIdle < 0) {
                throw new IllegalArgumentException("minimumIdle cannot be negative");
            }
            if (maximumPoolSize <= 0) {
                throw new IllegalArgumentException("maximumPoolSize must be positive");
            }
            if (minimumIdle > maximumPoolSize) {
                throw new IllegalArgumentException("minimumIdle cannot be greater than maximumPoolSize");
            }
        }
    }
}