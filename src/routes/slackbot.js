const req = require('request');
const querystring = require('querystring');
const rp = require('request-promise');
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
    const responseMessage = `Hey! you have been invited for a ${type} in ${venue} date: ${date} time: ${time}`;
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
        const invitationPromise = [];
        recArr.forEach((id) => {
          const urlparam = {
            token: key,
            channel: id,
            attachments: JSON.stringify(message),
            text: responseMessage,
          };
          const qs = querystring.stringify(urlparam);
          const pathToCall = `http://slack.com/api/chat.postMessage?${qs}`;
          req(pathToCall, (error, res) => {
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
          const urlparam2 = {
            token: key,
            user: id,
            // attachments: JSON.stringify(message),
            time,
            // command: '/remind',
            text: 'take it in your mouth',
          };
          const qs2 = querystring.stringify(urlparam2);
          console.log(qs2);
          const options = {
            method: 'POST',
            url: `https://slack.com/api/reminders.add?${qs2}`,
          };
          invitationPromise.append(rp(options));
        });
        Promise.all(promiseArr).then((values) => {
          console.log(values);
          Promise.add(invitationPromise).then((values2) => {
            console.log(values2);
            response('Invitation Sent Successfully!');
          });
        });
      });
    });
  },
};

