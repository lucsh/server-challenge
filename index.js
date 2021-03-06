'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const config = require('./config');

const putOne = require('./service/putOne');
const deleteOne = require('./service/deleteOne');
const getAll = require('./service/getAll');
const getOne = require('./service/getOne');

const app = express();

const { allowedOrigins } = config;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      // if the origin is not in the allowed array
      if (!allowedOrigins.includes(origin)) {
        const msg = 'The CORS policy for this site does not allow access from that Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// remove the express header
app.disable('x-powered-by');

app.put('/timezones/:name', putOne);

app.delete('/timezones/:name', deleteOne);

app.get('/timezones', getAll);

app.get('/timezones/:name', getOne);

app.listen(config.port, () => console.log(`Server running -> http://localhost:${config.port}`));
