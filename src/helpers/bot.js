const Bot = require('slackbots');
const key = require('../constants/keys');

const settings = {
  token: key,
  name: 'meeting',
};
const bot = new Bot(settings);
module.exports = bot;
