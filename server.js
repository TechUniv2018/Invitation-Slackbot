const Hapi = require('hapi');
const Routes = require('./src/routes');
const bot = require('./src/helpers/bot');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 8080,
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Server running at:', server.info.uri);
    }
  });
}

module.exports = server;

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

const processMessage = (msg) => {
  const message = msg.text;
  const recipients = new Set(message.split(/[@]+/)
    .filter(e => e[0] === '@'));
  for (const id of recipients) {
    bot.postMessageToUser(id.slice(1), 'hi man whatsup?');
  }
};
