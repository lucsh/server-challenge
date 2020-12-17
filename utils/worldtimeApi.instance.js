'use strict';

const axios = require('axios');

module.exports = axios.create({
  baseURL: 'http://worldtimeapi.org/api',
  timeout: 20000
});
