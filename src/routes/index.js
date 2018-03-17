const slackbot = require('./slackbot');
const slackbotbutton = require('./slackbot-button');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hello world! this is sample example');
    },
  },
].concat(slackbot, slackbotbutton);
