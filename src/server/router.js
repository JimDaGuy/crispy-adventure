const os = require('os');
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Temp route
  app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

  // Account Routes
  app.post('/api/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/api/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/api/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post(
    '/api/changePassword',
    mid.requiresSecure,
    mid.requiresLogout,
    controllers.Account.changePassword
  );
};

module.exports = router;
