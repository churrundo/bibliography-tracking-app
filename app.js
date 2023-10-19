'use strict';
const articles = require('./controllers/articles');
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const connectDB = require('./config/database');
const app = module.exports = koa();

// Logger
app.use(logger());

// Routes for articles
app.use(route.get('/', articles.home));
app.use(route.get('/articles', articles.list));
app.use(route.get('/articles/:id', articles.fetch));
app.use(route.post('/articles', articles.create));

// Serve static files (if you have any frontend components in your MVP)
app.use(serve(path.join(__dirname, 'public')));

// Compress (useful for performance)
app.use(compress());

if (!module.parent) {
  connectDB().then(client => {
    app.context.db = client.db('bibliography-tracker-app'); // This makes the db instance available in Koa context
    app.listen(3000, () => {
      console.log('Connected to MongoDB & listening on port 3000');
    });
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
}