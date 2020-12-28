require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./server/models/index');
const { UserFacingError } = require('./server/errors/applicationErrors');

const app = express();
const router = express.Router();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

require('./server/routes')(router);
app.use('/', router);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.use((err, req, res, next) => {
  if (err instanceof UserFacingError) {
    res.status(err.statusCode).json({
      name: err.name,
      error: err.message,
    });
  } else {
    res.sendStatus(500);
  }
});

module.exports = app;
