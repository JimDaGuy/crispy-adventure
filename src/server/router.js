const mid = require('./middleware');

const router = (app) => {
  app.get('/bop', mid.requiresSecure);
};

module.exports = router;
