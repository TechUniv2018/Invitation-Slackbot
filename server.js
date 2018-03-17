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
