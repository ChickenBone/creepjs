const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fingerprint TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS fingerprints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fingerprint TEXT,
      profile TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveMetric(fingerprint) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO metrics (fingerprint) VALUES (?)`;
    db.run(query, [fingerprint], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
}

function getFingerprint(fingerprint) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM fingerprints WHERE fingerprint = ?`;
    db.get(query, [fingerprint], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

function saveFingerprint(fingerprint, profile) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO fingerprints (fingerprint, profile) VALUES (?, ?)`;
    db.run(query, [fingerprint, profile], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
}

module.exports = {
  saveMetric,
  getFingerprint,
  saveFingerprint,
};
