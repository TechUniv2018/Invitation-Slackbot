const req = require('request');
const querystring = require('querystring');
const bot = require('../helpers/bot');
const key = require('../constants/keys');

const message = [
  {
    text: 'Would you like to join',
    fallback: "Shame... buttons aren't supported in this land",
    callback_id: 'event-id-here',
    color: '#3AA3E3',
    attachment_type: 'default',
    actions: [
      {
        name: 'accept',
        text: 'Accept',
        type: 'button',
        value: 'accept',
      },
      {
        name: 'reject',
        text: 'Reject',
        type: 'button',
        value: 'no',
      },
    ],
  },
];

module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    const recipients = new Set(request.payload.text.split(/[ ]+/)
      .filter(e => e[0] === '@'));
      const messageBody = request.payload.text.split(/[ ]/);
      const type = messageBody[messageBody.indexOf('type:')+1];
      const time = messageBody[messageBody.indexOf('at:')+1];
      const tempVenue = request.payload.text.split('venue: ');
      const venue = tempVenue[1].split(' at:');
      console.log('type, venue and time ',type,venue, time);
      const recArr = Array.from(recipients);
      const inviteMessage = 'Hey! you have been invited for a '+ type +' in ' + venue;
      recArr.forEach((id) => {
        const urlparam = {
          token: key,
          channel: id,
          attachments: JSON.stringify(message),
          text: inviteMessage,
        };
      const qs = querystring.stringify(urlparam);
      const path_to_call = `http://slack.com/api/chat.postMessage?${qs}`;
      req(path_to_call, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          console.log('Success');
        } else {
          console.log(error);
        }
      });
    });
  },
};
