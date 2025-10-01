package com.example.clickhouse.datasource;

import com.example.clickhouse.config.ClickHouseShardProperties;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Represents a single ClickHouse shard with its connection pool and health status
 */
public class ClickHouseShard implements AutoCloseable {
    
    private static final Logger logger = LoggerFactory.getLogger(ClickHouseShard.class);
    
    private final String name;
    private final String url;
    private final int weight;
    private final HikariDataSource dataSource;
    private final AtomicBoolean healthy = new AtomicBoolean(true);
    private final AtomicLong lastHealthCheck = new AtomicLong(System.currentTimeMillis());
    private final AtomicLong failureCount = new AtomicLong(0);
    private final AtomicReference<Instant> lastFailure = new AtomicReference<>();
    
    public ClickHouseShard(ClickHouseShardProperties.ShardConfig config, 
                          ClickHouseShardProperties.HikariConfig hikariConfig) {
        this.name = config.name();
        this.url = config.url();
        this.weight = config.weight();
        this.dataSource = createDataSource(config, hikariConfig);
        
        logger.info("Created ClickHouse shard '{}' with URL: {}", name, url);
    }
    
    private HikariDataSource createDataSource(ClickHouseShardProperties.ShardConfig config,
                                            ClickHouseShardProperties.HikariConfig hikariConfig) {
        HikariConfig hikariConf = new HikariConfig();
        
        // Basic connection settings
        hikariConf.setJdbcUrl(config.url());
        hikariConf.setUsername(config.username());
        hikariConf.setPassword(config.password());
        hikariConf.setDriverClassName("com.clickhouse.jdbc.ClickHouseDriver");
        
        // Pool settings
        hikariConf.setMinimumIdle(hikariConfig.minimumIdle());
        hikariConf.setMaximumPoolSize(hikariConfig.maximumPoolSize());
        hikariConf.setMaxLifetime(hikariConfig.maxLifetime().toMillis());
        hikariConf.setIdleTimeout(hikariConfig.idleTimeout().toMillis());
        
        // Connection validation
        hikariConf.setConnectionTestQuery("SELECT 1");
        hikariConf.setValidationTimeout(5000);
        
        // Pool name for monitoring
        hikariConf.setPoolName("ClickHouse-" + config.name());
        
        // Additional properties
        config.properties().forEach(hikariConf::addDataSourceProperty);
        
        // Performance settings
        hikariConf.addDataSourceProperty("socket_timeout", "30000");
        hikariConf.addDataSourceProperty("connection_timeout", "10000");
        hikariConf.addDataSourceProperty("compress", "true");
        hikariConf.addDataSourceProperty("decompress", "true");
        
        return new HikariDataSource(hikariConf);
    }
    
    /**
     * Get a connection from this shard
     */
    public Connection getConnection() throws SQLException {
        if (!healthy.get()) {
            throw new SQLException("Shard '" + name + "' is currently unhealthy");
        }
        
        try {
            Connection connection = dataSource.getConnection();
            logger.debug("Retrieved connection from shard '{}'", name);
            return connection;
        } catch (SQLException e) {
            recordFailure(e);
            throw e;
        }
    }
    
    /**
     * Check if this shard is healthy
     */
    public boolean isHealthy() {
        return healthy.get();
    }
    
    /**
     * Perform health check on this shard
     */
    public boolean performHealthCheck() {
        lastHealthCheck.set(System.currentTimeMillis());
        
        try (Connection conn = dataSource.getConnection()) {
            // Simple health check query
            try (var stmt = conn.createStatement();
                 var rs = stmt.executeQuery("SELECT 1")) {
                
                boolean hasResult = rs.next();
                if (hasResult && rs.getInt(1) == 1) {
                    if (!healthy.get()) {
                        logger.info("Shard '{}' is now healthy", name);
                        healthy.set(true);
                        failureCount.set(0);
                    }
                    return true;
                }
            }
        } catch (Exception e) {
            logger.warn("Health check failed for shard '{}': {}", name, e.getMessage());
            recordFailure(e);
        }
        
        return false;
    }
    
    /**
     * Record a failure for this shard
     */
    public void recordFailure(Exception e) {
        long failures = failureCount.incrementAndGet();
        lastFailure.set(Instant.now());
        
        if (healthy.get()) {
            logger.error("Marking shard '{}' as unhealthy after {} failures. Last error: {}", 
                        name, failures, e.getMessage());
            healthy.set(false);
        }
    }
    
    /**
     * Force mark this shard as healthy (for manual recovery)
     */
    public void markHealthy() {
        healthy.set(true);
        failureCount.set(0);
        lastFailure.set(null);
        logger.info("Manually marked shard '{}' as healthy", name);
    }
    
    /**
     * Get shard statistics
     */
    public ShardStats getStats() {
        return new ShardStats(
            name,
            url,
            weight,
            healthy.get(),
            failureCount.get(),
            lastFailure.get(),
            Instant.ofEpochMilli(lastHealthCheck.get()),
            dataSource.getHikariPoolMXBean().getActiveConnections(),
            dataSource.getHikariPoolMXBean().getIdleConnections(),
            dataSource.getHikariPoolMXBean().getTotalConnections()
        );
    }
    
    @Override
    public void close() {
        logger.info("Closing shard '{}'", name);
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }
    
    // Getters
    public String getName() { return name; }
    public String getUrl() { return url; }
    public int getWeight() { return weight; }
    public DataSource getDataSource() { return dataSource; }
    public long getFailureCount() { return failureCount.get(); }
    public Instant getLastFailure() { return lastFailure.get(); }
    
    /**
     * Statistics record for a shard
     */
    public record ShardStats(
        String name,
        String url,
        int weight,
        boolean healthy,
        long failureCount,
        Instant lastFailure,
        Instant lastHealthCheck,
        int activeConnections,
        int idleConnections,
        int totalConnections
    ) {}
}