package com.example.clickhouse.service;

import com.example.clickhouse.datasource.ShardedClickHouseDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Example service demonstrating usage of ShardedClickHouseDataSource
 */
@Service
public class ClickHouseService {
    
    private static final Logger logger = LoggerFactory.getLogger(ClickHouseService.class);
    
    private final ShardedClickHouseDataSource dataSource;
    
    @Autowired
    public ClickHouseService(ShardedClickHouseDataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    /**
     * Execute a simple query that will be load-balanced across shards
     */
    public List<Map<String, Object>> executeQuery(String sql) throws SQLException {
        logger.info("Executing query: {}", sql);
        
        List<Map<String, Object>> results = new ArrayList<>();
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            int columnCount = rs.getMetaData().getColumnCount();
            
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = rs.getMetaData().getColumnName(i);
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                results.add(row);
            }
        }
        
        logger.info("Query executed successfully, returned {} rows", results.size());
        return results;
    }
    
    /**
     * Execute an INSERT statement that will be load-balanced across shards
     */
    public int executeUpdate(String sql, Object... parameters) throws SQLException {
        logger.info("Executing update: {}", sql);
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            // Set parameters
            for (int i = 0; i < parameters.length; i++) {
                stmt.setObject(i + 1, parameters[i]);
            }
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Update executed successfully, {} rows affected", rowsAffected);
            return rowsAffected;
        }
    }
    
    /**
     * Get comprehensive statistics about the data source
     */
    public ShardedClickHouseDataSource.DataSourceStats getDataSourceStats() {
        return dataSource.getStats();
    }
    
    /**
     * Manually trigger health checks for all shards
     */
    public void triggerHealthCheck() {
        logger.info("Manually triggering health check");
        dataSource.triggerHealthCheck();
    }
    
    /**
     * Example method to create a test table on all shards
     */
    public void createTestTable() throws SQLException {
        String createTableSql = """
            CREATE TABLE IF NOT EXISTS test_events (
                id UInt64,
                timestamp DateTime,
                user_id UInt64,
                event_type String,
                data String
            ) ENGINE = MergeTree()
            ORDER BY (timestamp, user_id)
            PARTITION BY toYYYYMM(timestamp)
            """;
        
        executeUpdate(createTableSql);
        logger.info("Test table created successfully");
    }
    
    /**
     * Example method to insert test data
     */
    public void insertTestData(long id, long userId, String eventType, String data) throws SQLException {
        String insertSql = """
            INSERT INTO test_events (id, timestamp, user_id, event_type, data)
            VALUES (?, now(), ?, ?, ?)
            """;
        
        executeUpdate(insertSql, id, userId, eventType, data);
    }
    
    /**
     * Example method to query test data
     */
    public List<Map<String, Object>> getRecentEvents(int limit) throws SQLException {
        String querySql = """
            SELECT id, timestamp, user_id, event_type, data
            FROM test_events
            ORDER BY timestamp DESC
            LIMIT ?
            """;
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(querySql)) {
            
            stmt.setInt(1, limit);
            
            List<Map<String, Object>> results = new ArrayList<>();
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    row.put("id", rs.getLong("id"));
                    row.put("timestamp", rs.getTimestamp("timestamp"));
                    row.put("user_id", rs.getLong("user_id"));
                    row.put("event_type", rs.getString("event_type"));
                    row.put("data", rs.getString("data"));
                    results.add(row);
                }
            }
            
            return results;
        }
    }
    
    /**
     * Health check method that can be used by monitoring systems
     */
    public boolean isHealthy() {
        try {
            ShardedClickHouseDataSource.DataSourceStats stats = dataSource.getStats();
            return stats.getHealthyShardsCount() > 0;
        } catch (Exception e) {
            logger.error("Error checking data source health", e);
            return false;
        }
    }
}