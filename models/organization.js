const db = require('../db');

function list() {
  return db.all('organizations');
}

function get(id) {
  return db.find('organizations', id);
}

function create(attrs) {
  const id = Date.now().toString();
  const rec = Object.assign({ id }, attrs);
  return db.insert('organizations', rec);
}

function updateOrg(id, attrs) {
  return db.update('organizations', id, attrs);
}

function remove(id) {
  return db.remove('organizations', id);
}

module.exports = { list, get, create, updateOrg, remove };
