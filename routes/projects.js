const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Org = require('../models/organization');
const Cat = require('../models/category');

router.get('/', (req, res) => {
  const projects = Project.list();
  res.render('projects/index', { projects, orgs: Org.list(), cats: Cat.list() });
});

router.get('/new', (req, res) => {
  res.render('projects/new', { orgs: Org.list() });
});

router.post('/', (req, res) => {
  const { name, description, organizationId } = req.body;
  if (!name || !name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect('/projects/new');
  }
  Project.create({ name: name.trim(), description: description || '', organizationId: organizationId || '' });
  req.flash('success', 'Project created');
  res.redirect('/projects');
});

router.get('/:id/edit', (req, res) => {
  const p = Project.get(req.params.id);
  if (!p) return res.redirect('/projects');
  res.render('projects/edit', { project: p, orgs: Org.list() });
});

router.post('/:id', (req, res) => {
  if (!req.body.name || !req.body.name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect(`/projects/${req.params.id}/edit`);
  }
  Project.updateProj(req.params.id, { name: req.body.name.trim(), description: req.body.description || '', organizationId: req.body.organizationId || '' });
  req.flash('success', 'Project updated');
  res.redirect('/projects');
});

// Assign categories
router.get('/:id/assign-categories', (req, res) => {
  const p = Project.get(req.params.id);
  if (!p) return res.redirect('/projects');
  const categories = Cat.list();
  res.render('projects/assign_categories', { project: p, categories });
});

router.post('/:id/assign-categories', (req, res) => {
  const selected = Array.isArray(req.body.categories) ? req.body.categories : (req.body.categories ? [req.body.categories] : []);
  const p = Project.get(req.params.id);
  if (!p) return res.redirect('/projects');
  p.categories = selected;
  Project.updateProj(req.params.id, p);
  res.redirect('/projects');
});

module.exports = router;
