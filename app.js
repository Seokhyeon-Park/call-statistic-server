require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const statistics = require('./routes/statistics');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', function (req, res, next) {
  console.log("REQUEST URL : ", req.originalUrl);
  console.log("USER IP : ", req.ip);
  console.log("USER AGENT : ", req.headers['user-agent']);
  next();
});

app.use('/statistics', statistics);

module.exports = app;