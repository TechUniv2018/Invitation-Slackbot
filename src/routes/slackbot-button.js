module.exports = {
  method: 'POST',
  path: '/slackbot-button',
  handler: (request, response) => {
    console.log('incoming request', request.payload);
    response('fullfilled');
  },
};

