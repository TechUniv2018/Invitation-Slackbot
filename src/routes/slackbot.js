const req = require('request');
const querystring = require('querystring');
const bot = require('../helpers/bot');
const key = require('../constants/keys');

// const allUsers = [];
// const loadBotUser = () => {
//   const promise = new Promise((resolve) => {
//     bot.getUsers()
//       .then(result => result.members.filter(eachUser =>
//         eachUser.is_bot === false && eachUser.id !== 'USLACKBOT'))
//       .then(users => users.forEach((user) => {
//         allUsers[user.id] = user.name;
//       })).then(() => {
//         resolve(allUsers);
//       });
//   });
//   return promise;
// };
// bot.on('start', () => {
//   loadBotUser();
// });
const message = [
  {
    text: 'Would you like to join',
    fallback: "Shame... buttons aren't supported in this land",
    callback_id: 'button_tutorial',
    color: '#3AA3E3',
    attachment_type: 'default',
    actions: [
      {
        name: 'accept',
        text: 'Accept',
        type: 'button',
        value: 'eventidhere',
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
	console.log('rec:', recipients );
	const recArr = Array.from(recipients);
	// let i; 
 recArr.forEach ((id) => {
	console.log('id:::::::', recArr[i]);
    const urlparam = {
      token: key,
      channel: recArr[i],
      attachments: JSON.stringify(message),
      text: request.payload.text,
    };
    const qs = querystring.stringify(urlparam);
    const path_to_call = `http://slack.com/api/chat.postMessage?${qs}`;
	console.log(path_to_call);
    req(path_to_call, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log('Success');
      } else {
        console.log(error);
      }
    });
  }
}
};
