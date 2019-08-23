const fs = require('fs');

const writeNewKey = (
  browserstackKeyLocation,
  browserstackKeyFile,
  { old_key, new_key }
) => {
  const newFileString = browserstackKeyFile.replace(old_key, new_key);
  fs.writeFileSync(browserstackKeyLocation, newFileString);
};

module.exports = {
  writeNewKey
};
