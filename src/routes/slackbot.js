const rp = require('request-promise');
const querystring = require('querystring');
const key = require('../constants/keys');

module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    const urlparam = {
      token: key,
      user: 'U9SKHDACE',
      // attachments: JSON.stringify(message),
      time: '11:00pm',
      // command: '/remind',
      text: 'take it in your mouth',
    };
    const qs = querystring.stringify(urlparam);
    console.log(qs);
    const options = {
      method: 'POST',
      url: `https://slack.com/api/reminders.add?${qs}`,
    };
    rp(options).then((resp) => {
      console.log(resp);
      response('Invitation Sent Successfully!');
    });
  },
};
