package com.example.clickhouse.controller;

import com.example.clickhouse.datasource.ShardedClickHouseDataSource;
import com.example.clickhouse.service.ClickHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * REST controller demonstrating ClickHouse sharded data source usage
 */
@RestController
@RequestMapping("/api/clickhouse")
public class ClickHouseController {
    
    private final ClickHouseService clickHouseService;
    
    @Autowired
    public ClickHouseController(ClickHouseService clickHouseService) {
        this.clickHouseService = clickHouseService;
    }
    
    /**
     * Execute a custom query
     */
    @PostMapping("/query")
    public ResponseEntity<?> executeQuery(@RequestBody Map<String, String> request) {
        try {
            String sql = request.get("sql");
            if (sql == null || sql.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("SQL query is required");
            }
            
            List<Map<String, Object>> results = clickHouseService.executeQuery(sql);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "rowCount", results.size(),
                "data", results
            ));
            
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Get data source statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<ShardedClickHouseDataSource.DataSourceStats> getStats() {
        ShardedClickHouseDataSource.DataSourceStats stats = clickHouseService.getDataSourceStats();
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Trigger health check
     */
    @PostMapping("/health-check")
    public ResponseEntity<Map<String, Object>> triggerHealthCheck() {
        clickHouseService.triggerHealthCheck();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Health check triggered"
        ));
    }
    
    /**
     * Create test table
     */
    @PostMapping("/test-table")
    public ResponseEntity<Map<String, Object>> createTestTable() {
        try {
            clickHouseService.createTestTable();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Test table created successfully"
            ));
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Insert test data
     */
    @PostMapping("/test-data")
    public ResponseEntity<Map<String, Object>> insertTestData(
            @RequestParam long id,
            @RequestParam long userId,
            @RequestParam String eventType,
            @RequestParam String data) {
        try {
            clickHouseService.insertTestData(id, userId, eventType, data);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Test data inserted successfully"
            ));
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Get recent events
     */
    @GetMapping("/recent-events")
    public ResponseEntity<?> getRecentEvents(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<Map<String, Object>> events = clickHouseService.getRecentEvents(limit);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "count", events.size(),
                "events", events
            ));
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Simple health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        boolean healthy = clickHouseService.isHealthy();
        return ResponseEntity.ok(Map.of(
            "healthy", healthy,
            "status", healthy ? "UP" : "DOWN"
        ));
    }
}