const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Set/Update Ratings
  app.post('/api/setRating', mid.requiresLogin, controllers.Painting.setRating);

  // Set/Remove/Check Bookmarks
  app.get('/api/checkBookmark', mid.requiresLogin, controllers.Painting.checkBookmark);
  app.post('/api/setBookmark', mid.requiresLogin, controllers.Painting.setBookmark);

  // Get Paintings from HAM API
  app.get('/api/getRandomPainting', mid.requiresLogin, controllers.HamAPI.getRandomPainting);

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

  app.get('/api/checkUser', controllers.Account.checkUser);
  app.get('/api/checkLogin', controllers.Account.checkLogin);

  // Security
  app.get('/api/getToken', mid.requiresSecure, controllers.Helper.getToken);
};

module.exports = router;
