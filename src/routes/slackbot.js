const rp = require('request-promise');
const querystring = require('querystring');
// const bot = require('../helpers/bot');
const key = require('../constants/keys');
const models = require('../../models');

module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    const urlparam = {
      token: key,
      user: 'U9R2YTYUR',
      // attachments: JSON.stringify(message),
      time: '11:00pm',
      // command: '/remind',
      text: 'eat a banana',
    };
    const qs = querystring.stringify(urlparam);
    const options = {
      method: 'POST',
      url: `https://slack.com/api/reminders.add?${qs}`,
    };
      // const pathToCall = ;
    rp(options).then(() => {
      response('Invitation Sent Successfully!');
    });
  },
};
