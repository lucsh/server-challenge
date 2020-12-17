'use strict';

const axiosRetry = require('axios-retry');
const worldtimeApi = require('./worldtimeApi.instance');

const config = require('../config');

module.exports = axiosRetry(worldtimeApi, {
  retries: config.externalApiRetries, // number of retries
  retryDelay: (retryCount) => retryCount * 2000, // time interval between retries
  retryCondition: (error) => error.response.status === 503
});
