const req = require('request');
const querystring = require('querystring');
// const bot = require('../helpers/bot');
const key = require('../constants/keys');
const models = require('../../models');

module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    const recipients = new Set(request.payload.text.split(/[ ]+/)
      .filter(e => e[0] === '@'));
    const messageBody = request.payload.text.split(/[ ]/);
    const date = messageBody[messageBody.indexOf('date:') + 1];
    const type = messageBody[messageBody.indexOf('type:') + 1];
    const time = messageBody[messageBody.indexOf('time:') + 1];
    const tempVenue = request.payload.text.split('venue: ');
    const venue = tempVenue[1].split(' date:')[0];
    const responseMessage = '/remind @Parth water 8:57';
    console.log('type: ', type);
    console.log('venue: ', venue);
    console.log('date: ', date);
    console.log('time: ', time);
    const createby = `@${request.payload.user_name}`;
    const recArr = Array.from(recipients);
    let eventId;
    models.events.count().then((count) => {
      models.events.create({
        eventid: count + 1,
        title: type,
        venue,
        time,
        date,
        type,
        createby,
      }).then((result) => {
        eventId = result.dataValues.eventid;
        const message = [
          {
            text: 'Would you like to join',
            fallback: "Shame... buttons aren't supported in this land",
            callback_id: 'event-id-here',
            color: '#3AA3E3',
            attachment_type: 'default',
            actions: [
              {
                name: 'Accepted',
                text: 'Accept',
                type: 'button',
                value: eventId,
              },
              {
                name: 'Rejected',
                text: 'Reject',
                type: 'button',
                value: eventId,
              },
            ],
          },
        ];
        const promiseArr = [];
        recArr.forEach((id) => {
          const urlparam = {
            token: key,
            channel: id,
            // attachments: JSON.stringify(message),
            command: '/remind',
            text: 'list',
          };
          const qs = querystring.stringify(urlparam);
          const options = {
            method: 'POST',
            url: `https://slack.com/api/chat.command?${qs}`,
          };
          // const pathToCall = ;
          req(options, (error, res) => {
            if (!error && res.statusCode === 200) {
              console.log('Success');
            } else {
              console.log(error);
            }
          });
          const promise = new Promise((resolve) => {
            models.responses.create({
              eventid: eventId,
              userid: id,
              status: 'Pending',
            }).then(() => { resolve(`${id} inserted!`); });
          });
          promiseArr.push(promise);
        });
        Promise.all(promiseArr).then((values) => {
          console.log(values);
          response('Invitation Sent Successfully!');
        });
      });
    });
  },
};
