const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const router = express.Router();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(router);
app.use('/', router);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
