const test = require('ava');
const sinon = require('sinon');
const fs = require('fs');
const { writeNewKey } = require('./write-new-key');

test('should call file write with correct arguments', t => {
  const mockKeyFileLocation = 'somewhere/thing.txt';
  const mockKeyFile = 'My new key is 999999';
  const mockNewString = 'My new key is 12345';
  const writeStub = sinon
    .stub(fs, 'writeFileSync')
    .callsFake((keyLoc, newString) => {
      t.is(keyLoc, mockKeyFileLocation);
      t.is(newString, mockNewString);
    });
  writeNewKey(mockKeyFileLocation, mockKeyFile, {
    old_key: '999999',
    new_key: '12345'
  });
  writeStub.restore();
});
