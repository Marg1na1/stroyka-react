package com.example.clickhouse.datasource;

import com.example.clickhouse.config.ClickHouseShardProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

import javax.sql.DataSource;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger as JULLogger;

/**
 * Sharded ClickHouse DataSource with automatic failover and load balancing
 */
public class ShardedClickHouseDataSource implements DataSource, InitializingBean, DisposableBean {
    
    private static final Logger logger = LoggerFactory.getLogger(ShardedClickHouseDataSource.class);
    
    private final ClickHouseShardProperties properties;
    private final List<ClickHouseShard> shards;
    private final RoundRobinLoadBalancer loadBalancer;
    private final ScheduledExecutorService healthCheckExecutor;
    private final AtomicLong connectionAttempts = new AtomicLong(0);
    private final AtomicLong successfulConnections = new AtomicLong(0);
    private final AtomicLong failedConnections = new AtomicLong(0);
    
    private volatile boolean initialized = false;
    private volatile PrintWriter logWriter;
    private volatile int loginTimeout = 0;
    
    public ShardedClickHouseDataSource(ClickHouseShardProperties properties) {
        this.properties = properties;
        this.shards = createShards();
        this.loadBalancer = new RoundRobinLoadBalancer(shards);
        this.healthCheckExecutor = Executors.newScheduledThreadPool(
            Math.min(shards.size(), 4), 
            r -> {
                Thread t = new Thread(r, "ClickHouse-HealthCheck");
                t.setDaemon(true);
                return t;
            }
        );
        
        logger.info("Created ShardedClickHouseDataSource with {} shards", shards.size());
    }
    
    private List<ClickHouseShard> createShards() {
        return properties.shards().stream()
            .filter(ClickHouseShardProperties.ShardConfig::enabled)
            .map(config -> new ClickHouseShard(config, properties.hikari()))
            .toList();
    }
    
    @Override
    public void afterPropertiesSet() {
        if (shards.isEmpty()) {
            throw new IllegalStateException("No enabled shards configured");
        }
        
        // Start health check scheduler
        long healthCheckIntervalSeconds = properties.healthCheckInterval().toSeconds();
        healthCheckExecutor.scheduleWithFixedDelay(
            this::performHealthChecks,
            0, // Initial delay
            healthCheckIntervalSeconds,
            TimeUnit.SECONDS
        );
        
        initialized = true;
        logger.info("ShardedClickHouseDataSource initialized successfully");
    }
    
    @Override
    public Connection getConnection() throws SQLException {
        return getConnection(null, null);
    }
    
    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        if (!initialized) {
            throw new SQLException("DataSource not initialized");
        }
        
        connectionAttempts.incrementAndGet();
        
        SQLException lastException = null;
        int maxRetries = properties.maxRetries();
        Duration retryDelay = properties.retryDelay();
        
        for (int attempt = 0; attempt < maxRetries; attempt++) {
            ClickHouseShard shard = loadBalancer.getNextShard();
            
            if (shard == null) {
                throw new SQLException("No healthy shards available");
            }
            
            try {
                Connection connection = shard.getConnection();
                successfulConnections.incrementAndGet();
                
                logger.debug("Successfully obtained connection from shard '{}' on attempt {}", 
                           shard.getName(), attempt + 1);
                
                return new ShardAwareConnection(connection, shard, this);
                
            } catch (SQLException e) {
                lastException = e;
                logger.warn("Failed to get connection from shard '{}' on attempt {}: {}", 
                           shard.getName(), attempt + 1, e.getMessage());
                
                shard.recordFailure(e);
                loadBalancer.updateHealthyShards(shards);
                
                // Wait before retry (except for the last attempt)
                if (attempt < maxRetries - 1) {
                    try {
                        Thread.sleep(retryDelay.toMillis());
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new SQLException("Interrupted while waiting for retry", ie);
                    }
                }
            }
        }
        
        failedConnections.incrementAndGet();
        throw new SQLException("Failed to obtain connection after " + maxRetries + " attempts", lastException);
    }
    
    /**
     * Perform health checks on all shards
     */
    private void performHealthChecks() {
        logger.debug("Starting health checks for {} shards", shards.size());
        
        boolean anyStatusChanged = false;
        
        for (ClickHouseShard shard : shards) {
            try {
                boolean wasHealthy = shard.isHealthy();
                boolean isHealthy = shard.performHealthCheck();
                
                if (wasHealthy != isHealthy) {
                    anyStatusChanged = true;
                }
                
            } catch (Exception e) {
                logger.error("Error during health check for shard '{}': {}", shard.getName(), e.getMessage());
            }
        }
        
        if (anyStatusChanged) {
            loadBalancer.updateHealthyShards(shards);
        }
        
        logger.debug("Health checks completed");
    }
    
    /**
     * Handle connection failure from a specific shard
     */
    public void handleConnectionFailure(ClickHouseShard shard, SQLException e) {
        logger.warn("Connection failure reported for shard '{}': {}", shard.getName(), e.getMessage());
        shard.recordFailure(e);
        loadBalancer.updateHealthyShards(shards);
    }
    
    /**
     * Get comprehensive statistics about the data source
     */
    public DataSourceStats getStats() {
        List<ClickHouseShard.ShardStats> shardStats = shards.stream()
            .map(ClickHouseShard::getStats)
            .toList();
        
        RoundRobinLoadBalancer.LoadBalancerStats lbStats = loadBalancer.getStats();
        
        return new DataSourceStats(
            shardStats,
            lbStats,
            connectionAttempts.get(),
            successfulConnections.get(),
            failedConnections.get(),
            Instant.now()
        );
    }
    
    /**
     * Manually trigger health checks for all shards
     */
    public void triggerHealthCheck() {
        logger.info("Manually triggering health checks");
        healthCheckExecutor.execute(this::performHealthChecks);
    }
    
    /**
     * Get a specific shard by name
     */
    public ClickHouseShard getShard(String name) {
        return shards.stream()
            .filter(shard -> shard.getName().equals(name))
            .findFirst()
            .orElse(null);
    }
    
    /**
     * Get all shards
     */
    public List<ClickHouseShard> getAllShards() {
        return List.copyOf(shards);
    }
    
    @Override
    public void destroy() {
        logger.info("Shutting down ShardedClickHouseDataSource");
        
        // Shutdown health check executor
        healthCheckExecutor.shutdown();
        try {
            if (!healthCheckExecutor.awaitTermination(10, TimeUnit.SECONDS)) {
                healthCheckExecutor.shutdownNow();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            healthCheckExecutor.shutdownNow();
        }
        
        // Close all shards
        for (ClickHouseShard shard : shards) {
            try {
                shard.close();
            } catch (Exception e) {
                logger.error("Error closing shard '{}': {}", shard.getName(), e.getMessage());
            }
        }
        
        initialized = false;
        logger.info("ShardedClickHouseDataSource shutdown completed");
    }
    
    // DataSource interface methods
    @Override
    public PrintWriter getLogWriter() throws SQLException {
        return logWriter;
    }
    
    @Override
    public void setLogWriter(PrintWriter out) throws SQLException {
        this.logWriter = out;
    }
    
    @Override
    public void setLoginTimeout(int seconds) throws SQLException {
        this.loginTimeout = seconds;
    }
    
    @Override
    public int getLoginTimeout() throws SQLException {
        return loginTimeout;
    }
    
    @Override
    public JULLogger getParentLogger() throws SQLFeatureNotSupportedException {
        throw new SQLFeatureNotSupportedException("getParentLogger not supported");
    }
    
    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        if (iface.isAssignableFrom(getClass())) {
            return iface.cast(this);
        }
        throw new SQLException("Cannot unwrap to " + iface.getName());
    }
    
    @Override
    public boolean isWrapperFor(Class<?> iface) throws SQLException {
        return iface.isAssignableFrom(getClass());
    }
    
    /**
     * Comprehensive statistics record for the data source
     */
    public record DataSourceStats(
        List<ClickHouseShard.ShardStats> shardStats,
        RoundRobinLoadBalancer.LoadBalancerStats loadBalancerStats,
        long totalConnectionAttempts,
        long successfulConnections,
        long failedConnections,
        Instant timestamp
    ) {
        public double getSuccessRate() {
            return totalConnectionAttempts > 0 ? 
                (double) successfulConnections / totalConnectionAttempts : 0.0;
        }
        
        public long getHealthyShardsCount() {
            return shardStats.stream()
                .mapToLong(stats -> stats.healthy() ? 1 : 0)
                .sum();
        }
        
        public int getTotalActiveConnections() {
            return shardStats.stream()
                .mapToInt(ClickHouseShard.ShardStats::activeConnections)
                .sum();
        }
    }
}