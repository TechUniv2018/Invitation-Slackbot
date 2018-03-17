const slackbot = require('./slackbot');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (req, res) {
      res('hello world! this is sample example');
    },
  },
].concat(slackbot);

