const db = require('../db');

function list() {
  return db.all('projects');
}

function get(id) {
  return db.find('projects', id);
}

function create(attrs) {
  const id = Date.now().toString();
  const rec = Object.assign({ id, categories: [] }, attrs);
  return db.insert('projects', rec);
}

function updateProj(id, attrs) {
  return db.update('projects', id, attrs);
}

function remove(id) {
  return db.remove('projects', id);
}

module.exports = { list, get, create, updateProj, remove };
