const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

db.sync()
  .then(() => {
    app.use(require('body-parser').json());
    app.use('/api/auth', user);
    app.use(require('./middleware/validate-session'));
    app.use('/api/game', game);

    app.listen(process.env.SERVER_PORT || 4000, function () {
      console.log(`App is listening on ${process.env.SERVER_PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
