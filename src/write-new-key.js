const fs = require('fs');

/**
 *
 * @param {string} browserstackKeyLocation The absolute file path of the file to write the new key to
 * @param {string} browserstackKeyFile The file to write to as a UTF8 string
 * @param {{old_key: string, new_key: string}} The old and new browserstack keys
 */
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
