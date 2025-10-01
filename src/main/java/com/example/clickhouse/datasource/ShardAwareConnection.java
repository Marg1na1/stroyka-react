package com.example.clickhouse.datasource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.Executor;

/**
 * Connection wrapper that tracks failures and reports them back to the DataSource
 */
public class ShardAwareConnection implements Connection {
    
    private static final Logger logger = LoggerFactory.getLogger(ShardAwareConnection.class);
    
    private final Connection delegate;
    private final ClickHouseShard shard;
    private final ShardedClickHouseDataSource dataSource;
    private volatile boolean closed = false;
    
    public ShardAwareConnection(Connection delegate, ClickHouseShard shard, 
                               ShardedClickHouseDataSource dataSource) {
        this.delegate = delegate;
        this.shard = shard;
        this.dataSource = dataSource;
    }
    
    /**
     * Handle SQL exceptions and report network errors to the data source
     */
    private void handleException(SQLException e) throws SQLException {
        // Check if this is a network-related error
        if (isNetworkError(e)) {
            logger.warn("Network error detected on shard '{}': {}", shard.getName(), e.getMessage());
            dataSource.handleConnectionFailure(shard, e);
        }
        throw e;
    }
    
    /**
     * Determine if an SQLException is network-related
     */
    private boolean isNetworkError(SQLException e) {
        String message = e.getMessage().toLowerCase();
        String sqlState = e.getSQLState();
        
        // Common network error patterns
        return message.contains("connection") && (
            message.contains("refused") ||
            message.contains("timeout") ||
            message.contains("reset") ||
            message.contains("broken") ||
            message.contains("closed") ||
            message.contains("unreachable")
        ) || 
        // SQL State codes for communication errors
        (sqlState != null && (
            sqlState.startsWith("08") || // Connection exception
            sqlState.equals("HY000")     // General error that might be network-related
        ));
    }
    
    @Override
    public Statement createStatement() throws SQLException {
        try {
            return new ShardAwareStatement(delegate.createStatement(), this);
        } catch (SQLException e) {
            handleException(e);
            return null; // Never reached
        }
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql) throws SQLException {
        try {
            return new ShardAwarePreparedStatement(delegate.prepareStatement(sql), this);
        } catch (SQLException e) {
            handleException(e);
            return null; // Never reached
        }
    }
    
    @Override
    public CallableStatement prepareCall(String sql) throws SQLException {
        try {
            return delegate.prepareCall(sql);
        } catch (SQLException e) {
            handleException(e);
            return null; // Never reached
        }
    }
    
    @Override
    public String nativeSQL(String sql) throws SQLException {
        try {
            return delegate.nativeSQL(sql);
        } catch (SQLException e) {
            handleException(e);
            return null; // Never reached
        }
    }
    
    @Override
    public void setAutoCommit(boolean autoCommit) throws SQLException {
        try {
            delegate.setAutoCommit(autoCommit);
        } catch (SQLException e) {
            handleException(e);
        }
    }
    
    @Override
    public boolean getAutoCommit() throws SQLException {
        try {
            return delegate.getAutoCommit();
        } catch (SQLException e) {
            handleException(e);
            return false; // Never reached
        }
    }
    
    @Override
    public void commit() throws SQLException {
        try {
            delegate.commit();
        } catch (SQLException e) {
            handleException(e);
        }
    }
    
    @Override
    public void rollback() throws SQLException {
        try {
            delegate.rollback();
        } catch (SQLException e) {
            handleException(e);
        }
    }
    
    @Override
    public void close() throws SQLException {
        if (!closed) {
            closed = true;
            try {
                delegate.close();
            } catch (SQLException e) {
                // Don't report close errors as network failures
                logger.debug("Error closing connection on shard '{}': {}", shard.getName(), e.getMessage());
                throw e;
            }
        }
    }
    
    @Override
    public boolean isClosed() throws SQLException {
        return closed || delegate.isClosed();
    }
    
    // Delegate all other methods without error handling (they're less likely to have network issues)
    
    @Override
    public DatabaseMetaData getMetaData() throws SQLException {
        return delegate.getMetaData();
    }
    
    @Override
    public void setReadOnly(boolean readOnly) throws SQLException {
        delegate.setReadOnly(readOnly);
    }
    
    @Override
    public boolean isReadOnly() throws SQLException {
        return delegate.isReadOnly();
    }
    
    @Override
    public void setCatalog(String catalog) throws SQLException {
        delegate.setCatalog(catalog);
    }
    
    @Override
    public String getCatalog() throws SQLException {
        return delegate.getCatalog();
    }
    
    @Override
    public void setTransactionIsolation(int level) throws SQLException {
        delegate.setTransactionIsolation(level);
    }
    
    @Override
    public int getTransactionIsolation() throws SQLException {
        return delegate.getTransactionIsolation();
    }
    
    @Override
    public SQLWarning getWarnings() throws SQLException {
        return delegate.getWarnings();
    }
    
    @Override
    public void clearWarnings() throws SQLException {
        delegate.clearWarnings();
    }
    
    @Override
    public Statement createStatement(int resultSetType, int resultSetConcurrency) throws SQLException {
        return new ShardAwareStatement(delegate.createStatement(resultSetType, resultSetConcurrency), this);
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency) throws SQLException {
        return new ShardAwarePreparedStatement(delegate.prepareStatement(sql, resultSetType, resultSetConcurrency), this);
    }
    
    @Override
    public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency) throws SQLException {
        return delegate.prepareCall(sql, resultSetType, resultSetConcurrency);
    }
    
    @Override
    public Map<String, Class<?>> getTypeMap() throws SQLException {
        return delegate.getTypeMap();
    }
    
    @Override
    public void setTypeMap(Map<String, Class<?>> map) throws SQLException {
        delegate.setTypeMap(map);
    }
    
    @Override
    public void setHoldability(int holdability) throws SQLException {
        delegate.setHoldability(holdability);
    }
    
    @Override
    public int getHoldability() throws SQLException {
        return delegate.getHoldability();
    }
    
    @Override
    public Savepoint setSavepoint() throws SQLException {
        return delegate.setSavepoint();
    }
    
    @Override
    public Savepoint setSavepoint(String name) throws SQLException {
        return delegate.setSavepoint(name);
    }
    
    @Override
    public void rollback(Savepoint savepoint) throws SQLException {
        delegate.rollback(savepoint);
    }
    
    @Override
    public void releaseSavepoint(Savepoint savepoint) throws SQLException {
        delegate.releaseSavepoint(savepoint);
    }
    
    @Override
    public Statement createStatement(int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException {
        return new ShardAwareStatement(delegate.createStatement(resultSetType, resultSetConcurrency, resultSetHoldability), this);
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException {
        return new ShardAwarePreparedStatement(delegate.prepareStatement(sql, resultSetType, resultSetConcurrency, resultSetHoldability), this);
    }
    
    @Override
    public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException {
        return delegate.prepareCall(sql, resultSetType, resultSetConcurrency, resultSetHoldability);
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql, int autoGeneratedKeys) throws SQLException {
        return new ShardAwarePreparedStatement(delegate.prepareStatement(sql, autoGeneratedKeys), this);
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql, int[] columnIndexes) throws SQLException {
        return new ShardAwarePreparedStatement(delegate.prepareStatement(sql, columnIndexes), this);
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql, String[] columnNames) throws SQLException {
        return new ShardAwarePreparedStatement(delegate.prepareStatement(sql, columnNames), this);
    }
    
    @Override
    public Clob createClob() throws SQLException {
        return delegate.createClob();
    }
    
    @Override
    public Blob createBlob() throws SQLException {
        return delegate.createBlob();
    }
    
    @Override
    public NClob createNClob() throws SQLException {
        return delegate.createNClob();
    }
    
    @Override
    public SQLXML createSQLXML() throws SQLException {
        return delegate.createSQLXML();
    }
    
    @Override
    public boolean isValid(int timeout) throws SQLException {
        try {
            return delegate.isValid(timeout);
        } catch (SQLException e) {
            handleException(e);
            return false; // Never reached
        }
    }
    
    @Override
    public void setClientInfo(String name, String value) throws SQLClientInfoException {
        delegate.setClientInfo(name, value);
    }
    
    @Override
    public void setClientInfo(Properties properties) throws SQLClientInfoException {
        delegate.setClientInfo(properties);
    }
    
    @Override
    public String getClientInfo(String name) throws SQLException {
        return delegate.getClientInfo(name);
    }
    
    @Override
    public Properties getClientInfo() throws SQLException {
        return delegate.getClientInfo();
    }
    
    @Override
    public Array createArrayOf(String typeName, Object[] elements) throws SQLException {
        return delegate.createArrayOf(typeName, elements);
    }
    
    @Override
    public Struct createStruct(String typeName, Object[] attributes) throws SQLException {
        return delegate.createStruct(typeName, attributes);
    }
    
    @Override
    public void setSchema(String schema) throws SQLException {
        delegate.setSchema(schema);
    }
    
    @Override
    public String getSchema() throws SQLException {
        return delegate.getSchema();
    }
    
    @Override
    public void abort(Executor executor) throws SQLException {
        delegate.abort(executor);
    }
    
    @Override
    public void setNetworkTimeout(Executor executor, int milliseconds) throws SQLException {
        delegate.setNetworkTimeout(executor, milliseconds);
    }
    
    @Override
    public int getNetworkTimeout() throws SQLException {
        return delegate.getNetworkTimeout();
    }
    
    @Override
    public <T> T unwrap(Class<T> iface) throws SQLException {
        if (iface.isAssignableFrom(getClass())) {
            return iface.cast(this);
        }
        return delegate.unwrap(iface);
    }
    
    @Override
    public boolean isWrapperFor(Class<?> iface) throws SQLException {
        return iface.isAssignableFrom(getClass()) || delegate.isWrapperFor(iface);
    }
    
    // Package-private method to handle exceptions from statements
    void handleStatementException(SQLException e) throws SQLException {
        handleException(e);
    }
    
    public ClickHouseShard getShard() {
        return shard;
    }
}