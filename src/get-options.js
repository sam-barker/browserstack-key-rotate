const fetch = require('node-fetch');
const base64 = require('base-64');

const getOptions = (browserstackUser, browserstackKey) => ({
  method: 'PUT',
  headers: new fetch.Headers({
    Authorization: `Basic ${base64.encode(
      `${browserstackUser}:${browserstackKey}`
    )}`
  }),
  body: '{}'
});

module.exports = {
  getOptions
};
