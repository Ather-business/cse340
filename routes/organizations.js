const express = require('express');
const router = express.Router();
const Org = require('../models/organization');

router.get('/', (req, res) => {
  res.render('organizations/index', { organizations: Org.list() });
});

router.get('/new', (req, res) => {
  res.render('organizations/new');
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect('/organizations/new');
  }
  Org.create({ name: name.trim(), description: description || '' });
  req.flash('success', 'Organization created');
  res.redirect('/organizations');
});

router.get('/:id/edit', (req, res) => {
  const org = Org.get(req.params.id);
  if (!org) return res.redirect('/organizations');
  res.render('organizations/edit', { org });
});

router.post('/:id', (req, res) => {
  if (!req.body.name || !req.body.name.trim()) {
    req.flash('error', 'Name is required');
    return res.redirect(`/organizations/${req.params.id}/edit`);
  }
  Org.updateOrg(req.params.id, { name: req.body.name.trim(), description: req.body.description || '' });
  req.flash('success', 'Organization updated');
  res.redirect('/organizations');
});

module.exports = router;
