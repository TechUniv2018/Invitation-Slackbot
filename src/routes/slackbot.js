const rp = require('request-promise');
const querystring = require('querystring');

module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    const urlparam = {
      token: 'xoxp-332500622342-332663452422-331745669331-90dd130978e634f24e4cd9cc62500e25',
      user: 'U9SKHDACE',
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
    rp(options).then((resp) => {
      console.log(resp);
      response('Invitation Sent Successfully!');
    });
  },
};
