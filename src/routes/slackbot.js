module.exports = {
  method: 'GET',
  path: '/slackbot',
  handler: (request, response) => {
    console.log('incoming request', request);
    response('sering', request);
  },
};

