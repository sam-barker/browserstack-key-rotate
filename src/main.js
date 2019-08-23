const fetch = require('node-fetch');
const { getOptions } = require('./get-options');
const { getEnvVars } = require('./get-env-vars');
const { writeNewKey } = require('./write-new-key');
const { getPreviousKeyFile } = require('./get-previous-key-file');

const URL = 'https://api.browserstack.com/automate/recycle_key.json';

(async () => {
  try {
    const { BROWSERSTACK_KEY, BROWSERSTACK_USER, KEY_LOCATION } = getEnvVars();
    const browserstackKeyFile = getPreviousKeyFile(
      KEY_LOCATION,
      BROWSERSTACK_KEY
    );
    const options = getOptions(BROWSERSTACK_USER, BROWSERSTACK_KEY);
    const response = await fetch(URL, options);
    const data = await response.json();
    writeNewKey(KEY_LOCATION, browserstackKeyFile, data);
    console.log(
      `Success: Browserstack key has been successfully rotated. Please run 'source ${KEY_LOCATION} for changes to take effect'`
    );
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
