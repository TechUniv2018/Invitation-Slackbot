module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hello world');
    },
  },
];

