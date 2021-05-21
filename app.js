const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

db.sync();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);

app.listen(process.env.SERVER_PORT || 4000, function () {
  console.log(`App is listening on ${process.env.SERVER_PORT || 4000}`);
});
