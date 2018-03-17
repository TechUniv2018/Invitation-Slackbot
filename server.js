const Hapi = require('hapi');
const Routes = require('./src/routes');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 80,
});

server.route(Routes);

if (!module.parent) {
  server.start(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Server running at:', server.info.uri);
    }
  });
}

module.exports = server;
