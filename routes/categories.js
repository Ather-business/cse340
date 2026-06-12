const express = require('express');
const router = express.Router();
const Cat = require('../models/category');

router.get('/', (req, res) => {
  res.render('categories/index', { categories: Cat.list() });
});

router.get('/new', (req, res) => {
  res.render('categories/new');
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect('/categories/new');
  }
  Cat.create({ name: req.body.name.trim() });
  req.flash('success', 'Category created');
  res.redirect('/categories');
});

router.get('/:id/edit', (req, res) => {
  const c = Cat.get(req.params.id);
  if (!c) return res.redirect('/categories');
  res.render('categories/edit', { category: c });
});

router.post('/:id', (req, res) => {
  if (!req.body.name || !req.body.name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect(`/categories/${req.params.id}/edit`);
  }
  Cat.updateCat(req.params.id, { name: req.body.name.trim() });
  req.flash('success', 'Category updated');
  res.redirect('/categories');
});

module.exports = router;
