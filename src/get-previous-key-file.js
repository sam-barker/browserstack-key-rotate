const fs = require('fs');

const getPreviousKeyFile = (keyLocation, browserstackKey) => {
  if (!fs.existsSync(keyLocation)) {
    throw new Error(
      `Error: The file ${keyLocation} does not exist. Use the syntax 'KEY_LOCATION="$HOME/my/path/to/file"' if it is in your home directory.`
    );
  }

  const fileString = fs.readFileSync(keyLocation).toString('utf8');
  if (!fileString.includes(browserstackKey)) {
    throw new Error(
      `Error: The file ${keyLocation} does not include your BROWSERSTACK_KEY`
    );
  }

  return fileString;
};

module.exports = {
  getPreviousKeyFile
};
