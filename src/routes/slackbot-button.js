const models = require('../../models');
const key2 = require('../constants/key2');
const querystring = require('querystring');
const getAllUsers = require('../helpers/getAllUsers');
const rp = require('request-promise');


module.exports = {
  method: 'POST',
  path: '/slackbot-button',
  handler: (request, response) => {
    // const requestJSON = JSON.parse(request);
    // console.log('incoming request', request.payload);
    const reqJSON = JSON.parse(request.payload.payload);
    const { actions } = reqJSON;
    const status = actions[0].name;
    const eventid = actions[0].value;
    const userid = `@${reqJSON.user.name}`;
    console.log('status', status);
    console.log('eventid', eventid);
    console.log('userid', userid);
    models.responses.update({
      status,
    }, {
      where: {
        [models.Sequelize.Op.and]: [{ userid }, { eventid }],
      },
    })
      .then(() => {
        models.events.findOne({
          where: {
            eventid,
          },
        })
          .then(result1 => result1.dataValues)
          .then((result2) => {
            const finalMessage = `You have ${status} the ${result2.title} invitation at ${result2.venue} date: ${result2.date} time: ${result2.time}`;
            if (status === 'Accepted') {
              getAllUsers.then((values) => {
                const newId = values[userid];
                const urlparam2 = {
                  token: key2,
                  user: newId,
                  // attachments: JSON.stringify(message),
                  time: result2.time,
                  // command: '/remind',
                  text: result2.title,
                };
                const qs2 = querystring.stringify(urlparam2);
                console.log(qs2);
                const options = {
                  method: 'POST',
                  url: `https://slack.com/api/reminders.add?${qs2}`,
                };
                rp(options).then(() => {
                  console.log('####pushed');
                  response(finalMessage);
                });
              });
            }
          });
      });
  },
};

