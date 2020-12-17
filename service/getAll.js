'use strict';

const worldtimeApi = require('../utils/worldtimeApi.instance');
require('../utils/axiosRetry');
const redis = require('../utils/redis');
const config = require('../config');

const handler = async (req, res) => {
  // check if the request is cached.
  let timezones = await redis.get('timezones')
    .then((result) => (result ? result.split(',') : null));
  if (!timezones) {
    try {
      const response = await worldtimeApi.get('/timezone');
      timezones = response.data;

      redis.set('timezones', `${timezones}`, 'ex', 600);
    } catch (error) {
      console.log(
        `API call failed after ${config.externalApiRetries} retry attempts`
      );
      res.status(504).send();
      return error;
    }
  }
  res.status(200).json({ timezones });
  return timezones;
};

module.exports = handler;
