package com.example.clickhouse.config;

import com.example.clickhouse.datasource.ShardedClickHouseDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

/**
 * Auto-configuration for ClickHouse sharded data source
 */
@AutoConfiguration
@ConditionalOnClass(ShardedClickHouseDataSource.class)
@ConditionalOnProperty(prefix = "clickhouse.shards", name = "shards")
@EnableConfigurationProperties(ClickHouseShardProperties.class)
public class ClickHouseAutoConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(ClickHouseAutoConfiguration.class);
    
    @Bean
    @Primary
    @ConditionalOnMissingBean(name = "clickHouseDataSource")
    public ShardedClickHouseDataSource clickHouseDataSource(ClickHouseShardProperties properties) {
        logger.info("Creating ShardedClickHouseDataSource with {} shards", 
                   properties.shards().size());
        
        return new ShardedClickHouseDataSource(properties);
    }
    
    @Bean
    @ConditionalOnMissingBean
    public ClickHouseHealthIndicator clickHouseHealthIndicator(ShardedClickHouseDataSource dataSource) {
        return new ClickHouseHealthIndicator(dataSource);
    }
}