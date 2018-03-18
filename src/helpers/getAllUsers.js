const Bot = require('slackbots');
const key = require('../constants/keys');

// create a bot
const settings = {
  token: key,
  name: 'Invitations',
};
const bot = new Bot(settings);

const allUsers = [];
const loadBotUser = () => {
  const promise = new Promise((resolve) => {
    bot.getUsers()
      .then(result => result.members.filter(eachUser =>
        eachUser.is_bot === false && eachUser.id !== 'USLACKBOT'))
      .then(users => users.forEach((user) => {
        allUsers[user.name] = user.id;
      })).then(() => {
        resolve(allUsers);
      });
  });
  return promise;
};

module.exports = loadBotUser;
