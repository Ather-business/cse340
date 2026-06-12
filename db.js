const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { organizations: [], projects: [], categories: [] };
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

function all(collection) {
  const db = readDb();
  return db[collection] || [];
}

function find(collection, id) {
  return all(collection).find((r) => String(r.id) === String(id));
}

function insert(collection, record) {
  const db = readDb();
  db[collection] = db[collection] || [];
  db[collection].push(record);
  writeDb(db);
  return record;
}

function update(collection, id, attrs) {
  const db = readDb();
  db[collection] = db[collection] || [];
  const idx = db[collection].findIndex((r) => String(r.id) === String(id));
  if (idx === -1) return null;
  db[collection][idx] = Object.assign({}, db[collection][idx], attrs);
  writeDb(db);
  return db[collection][idx];
}

function remove(collection, id) {
  const db = readDb();
  db[collection] = db[collection] || [];
  db[collection] = db[collection].filter((r) => String(r.id) !== String(id));
  writeDb(db);
}

module.exports = { all, find, insert, update, remove };
