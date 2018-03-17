module.exports = {
  method: 'POST',
  path: '/slackbot',
  handler: (request, response) => {
    console.log('incoming request', request.payload);
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
    response(message);
  },
};


