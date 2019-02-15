const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');

// Setup environment variables
require('dotenv').config();

const port = process.env.PORT || process.env.NODE_PORT || 8080;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/PaintGauge';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

let redisURL = {
  hostname: 'localhost',
  port: 6379
};

let redisPass;

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPass = redisURL.auth.split(':')[1]; // eslint-disable-line prefer-destructuring
}

const router = require('./router.js');

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    key: 'sessionid',
    store: new RedisStore({
      host: redisURL.hostname,
      port: redisURL.port,
      pass: redisPass
    }),
    secret: 'Paint Gauge Super Duper Secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true
    }
  })
);
app.use(cookieParser());

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

router(app);
app.use(express.static(path.join(__dirname, '/../../public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/../../public/index.html')));

app.listen(port, (err) => {
  if (err) throw err;
  console.log('Listening on port 8080!');
});
