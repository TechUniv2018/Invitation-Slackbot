const bot = require('../helpers/bot');

const allUsers = [];
const loadBotUser = () => {
  const promise = new Promise((resolve) => {
    bot.getUsers()
      .then(result => result.members.filter(eachUser =>
        eachUser.is_bot === false && eachUser.id !== 'USLACKBOT'))
      .then(users => users.forEach((user) => {
        allUsers[user.id] = user.name;
      })).then(() => {
        resolve(allUsers);
      });
  });
  return promise;
};
bot.on('start', () => {
  loadBotUser();
});

const message = {
  text: 'Hey, you have been invited to join a party at @venue-here at @time-here',
  attachments: [
    {
      text: 'Would you like to join',
      fallback: "Shame... buttons aren't supported in this land",
      callback_id: 'button_tutorial',
      color: '#3AA3E3',
      attachment_type: 'default',
      actions: [
        {
          name: 'yes',
          text: 'yes',
          type: 'button',
          value: 1234567,
        },
        {
          name: 'no',
          text: 'no',
          type: 'button',
          value: 'no',
        },
        {
          name: 'maybe',
          text: 'maybe',
          type: 'button',
          value: 'maybe',
          style: 'danger',
        },
      ],
    },
  ],
};

module.exports = {
  method: 'GET',
  path: '/slackbot',
  handler: (request, response) => {
    processMessage(request.payload.text);
    response(message);
  },
};
const processMessage = (msg) => {
  const message = msg.text;
  const recipients = new Set(message.split(/[@]+/)
    .filter(e => e[0] === '@'));
  for (const id of recipients) {
    bot.postMessageToUser(id.slice(1), message);
    bot.postMessageToUser(id.slice(1), 'hi you are invited');
  }
};

