'use strict';

const {
  NODE_ENV, PORT, ALLOWED_ORIGINS
} = process.env;

const config = {
  enviroment: NODE_ENV || 'development',
  port: PORT || 3030,
  allowedOrigins: ALLOWED_ORIGINS || 'http://localhost:3000'
};

module.exports = config;
