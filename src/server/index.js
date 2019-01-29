const express = require('express');
const os = require('os');

const port = process.env.PORT || process.env.NODE_PORT || 8080;

const router = require('./router.js');

const app = express();

app.use(express.static('dist'));

router(app);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(port, (err) => {
  if (err) throw err;
  console.log('Listening on port 8080!');
});
