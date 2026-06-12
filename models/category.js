const db = require('../db');

function list() {
  return db.all('categories');
}

function get(id) {
  return db.find('categories', id);
}

function create(attrs) {
  const id = Date.now().toString();
  const rec = Object.assign({ id }, attrs);
  return db.insert('categories', rec);
}

function updateCat(id, attrs) {
  return db.update('categories', id, attrs);
}

function remove(id) {
  return db.remove('categories', id);
}

module.exports = { list, get, create, updateCat, remove };
