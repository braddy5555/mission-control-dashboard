// Local Database for Mission Control Dashboard
// Uses SQLite for zero-configuration setup

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'dashboard.db');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

// Initialize tables
function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Metrics history
      db.run(`CREATE TABLE IF NOT EXISTS metrics_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project TEXT NOT NULL,
        metric_type TEXT NOT NULL,
        value REAL,
        metadata TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Events/Logs
      db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project TEXT,
        event_type TEXT NOT NULL,
        message TEXT,
        severity TEXT DEFAULT 'info',
        metadata TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // User sessions
      db.run(`CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE,
        ip_address TEXT,
        user_agent TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Cached data from external sources
      db.run(`CREATE TABLE IF NOT EXISTS cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cache_key TEXT UNIQUE,
        data TEXT,
        expires_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

// Store metric
function storeMetric(project, metricType, value, metadata = {}) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO metrics_history (project, metric_type, value, metadata) VALUES (?, ?, ?, ?)'
    );
    stmt.run(project, metricType, value, JSON.stringify(metadata), function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
    stmt.finalize();
  });
}

// Get metrics history
function getMetricsHistory(project, metricType, hours = 24) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM metrics_history 
      WHERE project = ? AND metric_type = ? 
      AND timestamp > datetime('now', '-${hours} hours')
      ORDER BY timestamp DESC
    `;
    db.all(sql, [project, metricType], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(r => ({
        ...r,
        metadata: JSON.parse(r.metadata || '{}'),
        value: parseFloat(r.value)
      })));
    });
  });
}

// Log event
function logEvent(project, eventType, message, severity = 'info', metadata = {}) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO events (project, event_type, message, severity, metadata) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(project, eventType, message, severity, JSON.stringify(metadata), function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
    stmt.finalize();
  });
}

// Get recent events
function getRecentEvents(project = null, limit = 50) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM events WHERE 1=1';
    const params = [];
    
    if (project) {
      sql += ' AND project = ?';
      params.push(project);
    }
    
    sql += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(limit);
    
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(r => ({
        ...r,
        metadata: JSON.parse(r.metadata || '{}')
      })));
    });
  });
}

// Cache operations
function setCache(key, data, ttlSeconds = 300) {
  return new Promise((resolve, reject) => {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    const stmt = db.prepare(
      'INSERT OR REPLACE INTO cache (cache_key, data, expires_at) VALUES (?, ?, ?)'
    );
    stmt.run(key, JSON.stringify(data), expiresAt, function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
    stmt.finalize();
  });
}

function getCache(key) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM cache WHERE cache_key = ? AND expires_at > datetime("now")',
      [key],
      (err, row) => {
        if (err) reject(err);
        else if (!row) resolve(null);
        else resolve(JSON.parse(row.data));
      }
    );
  });
}

// Initialize on module load
initDatabase().then(() => {
  console.log('✓ Local database initialized at', DB_PATH);
}).catch(err => {
  console.error('✗ Database initialization failed:', err);
});

module.exports = {
  db,
  initDatabase,
  storeMetric,
  getMetricsHistory,
  logEvent,
  getRecentEvents,
  setCache,
  getCache
};
