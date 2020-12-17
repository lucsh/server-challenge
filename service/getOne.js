'use strict';

const worldtimeApi = require('../utils/worldtimeApi.instance');
require('../utils/axiosRetry');
const config = require('../config');

const handler = async (req, res) => {
  const { name: timezone } = req.params;
  try {
    const { data } = await worldtimeApi.get(`/timezone/${timezone}`);

    const datetime = new Date(data.datetime);

    const options = { timeZone: data.timezone };

    const parsedDate = datetime ? datetime.toLocaleDateString('en-US', options) : '';
    const parsedTime = datetime ? datetime.toLocaleTimeString('en-US', options) : '';

    res.status(200).json({ timezone, time: parsedTime, date: parsedDate });
    return { timezone, time: parsedTime, date: parsedDate };
  } catch (error) {
    console.log(
      `API call failed after ${config.externalApiRetries} retry attempts`
    );
    res.status(504).send();
    return error;
  }
};

module.exports = handler;
