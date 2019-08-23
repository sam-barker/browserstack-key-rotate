const fetch = require('node-fetch');
const base64 = require('base-64');
const fs = require('fs');

const { BROWSERSTACK_KEY, BROWSERSTACK_USER, KEY_LOCATION } = process.env;

if (!BROWSERSTACK_KEY || !BROWSERSTACK_USER) {
  console.error(
    'Error: BROWSERSTACK_KEY or BROWSERSTACK_ENV environment variables are not set'
  );
  process.exit(1);
}

if (!KEY_LOCATION) {
  console.error(
    'Error: Please specify where your BROWSERSTACK_KEY is set using the KEY_LOCATION environment variable'
  );
  process.exit(1);
}

if (!fs.existsSync(KEY_LOCATION)) {
  console.error(
    `Error: The file ${KEY_LOCATION} does not exist. Use the syntax 'KEY_LOCATION="$HOME/my/path/to/file"' if it is in your home directory.`
  );
  process.exit(1);
}

(async () => {
  const browserStackUrl =
    'https://api.browserstack.com/automate/recycle_key.json';

  const options = {
    method: 'PUT',
    headers: new fetch.Headers({
      Authorization: `Basic ${base64.encode(
        `${BROWSERSTACK_USER}:${BROWSERSTACK_KEY}`
      )}`
    }),
    body: '{}'
  };

  try {
    const fileString = fs.readFileSync(KEY_LOCATION).toString('utf8');
    if (!fileString.includes(BROWSERSTACK_KEY)) {
      console.error(
        `Error: The file ${KEY_LOCATION} does not include your BROWSERSTACK_KEY`
      );
      process.exit(1);
    }

    const response = await fetch(browserStackUrl, options);
    const { old_key, new_key } = await response.json();
    const newFileString = fileString.replace(old_key, new_key);
    fs.writeFileSync(KEY_LOCATION, newFileString);
    console.log(
      `Success: Browserstack key has been successfully rotated. Please run 'source ${KEY_LOCATION} for changes to take effect'`
    );
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
