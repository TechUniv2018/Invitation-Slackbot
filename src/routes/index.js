var slackbot = require('./slackbot');
var slackbotbutton = require('./slackbot-button');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (req, res) {
      res('hello world! this is sample example');
    },
  },
].concat(slackbot, slackbotbutton);

