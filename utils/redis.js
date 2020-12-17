'use strict';

const Redis = require('ioredis');
const config = require('../config');

const redis = config.enviroment === 'production' ? new Redis(config.redisURL) : new Redis();

module.exports = redis;
