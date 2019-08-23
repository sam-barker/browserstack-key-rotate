const fetch = require('node-fetch');
const base64 = require('base-64');

/**
 * Returns the HTTP request options to use with node-fetch
 * @param {string} browserstackUser The user's browserstack name
 * @param {string} browserstackKey The user's browserstack key
 */
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
