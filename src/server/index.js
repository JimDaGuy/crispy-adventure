const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const os = require('os');

const port = process.env.PORT || process.env.NODE_PORT || 8080;

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

app.use(express.static('dist'));

app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(port, (err) => {
  if (err) throw err;
  console.log('Listening on port 8080!');
});
