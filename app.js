const express = require('express');
const path = require('path');
const app = express();

const orgRoutes = require('./routes/organizations');
const projRoutes = require('./routes/projects');
const catRoutes = require('./routes/categories');
const session = require('express-session');
const flash = require('connect-flash');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'cse340-secret', resave: false, saveUninitialized: true }));
app.use(flash());

// expose flash messages to views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/organizations', orgRoutes);
app.use('/projects', projRoutes);
app.use('/categories', catRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
