'use strict';

const {
  NODE_ENV, REDIS_URL, PORT, IDEMPOTENCE_KEY_DURATION, EXTERNAL_API_RETRYS, ALLOWED_ORIGINS
} = process.env;

const config = {
  enviroment: NODE_ENV || 'development',
  redisURL: REDIS_URL,
  port: PORT || 3030,
  idempotenceKeyDuration: IDEMPOTENCE_KEY_DURATION || 600,
  externalApiRetries: EXTERNAL_API_RETRYS || 3,
  allowedOrigins: ALLOWED_ORIGINS || 'http://localhost:3000'
};

module.exports = config;
