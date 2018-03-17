const slackbot = require('./slackbot');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hello world');
    },
  },
].concat(slackbot);

