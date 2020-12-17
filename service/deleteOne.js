'use strict';

const redis = require('../utils/redis');
const config = require('../config');

const handler = async (req, res) => {
  // check if the idempotenceKey is cached.
  const idempotenceKey = await redis.get(req.headers['x-idempotence-key']);

  if (idempotenceKey) {
    return res.status(304).send('Not Modified');
  }

  const response = {
    message: `Timezone Deleted ${req.params.name}`
  };

  // store idempotenceKey in cache:
  return redis.set(req.headers['x-idempotence-key'], 1, 'ex', config.idempotenceKeyDuration)
    .then(() => {
      console.log(response.message);
      return res.status(204).send();
    });
};

module.exports = handler;
