const slackbot = require('./slackbot');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hello world! this is sample example');
    },
  },
].concat(slackbot);

