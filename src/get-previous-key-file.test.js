const test = require('ava');
const sinon = require('sinon');
const fs = require('fs');
const { getPreviousKeyFile } = require('./get-previous-key-file');

test('should throw an error is file does not exist', t => {
  const existsStub = sinon.stub(fs, 'existsSync');
  existsStub.returns(false);
  const error = t.throws(() => {
    getPreviousKeyFile('keylocation/thing.txt', 'mybskey');
  });
  t.is(
    error.message,
    `Error: The file keylocation/thing.txt does not exist. Use the syntax 'KEY_LOCATION="$HOME/my/path/to/file"' if it is in your home directory.`
  );
  existsStub.restore();
});

test('should throw an error if the read file does not include the key', t => {
  const existsStub = sinon.stub(fs, 'existsSync');
  const readStub = sinon.stub(fs, 'readFileSync');
  const mockString = 'This does not include the key';
  const mockBuffer = Buffer.from(mockString, 'utf8');
  existsStub.returns(true);
  readStub.returns(mockBuffer);
  const error = t.throws(() => {
    getPreviousKeyFile('keylocation/thing.txt', 'mybskey');
  });
  t.is(
    error.message,
    `Error: The file keylocation/thing.txt does not include your BROWSERSTACK_KEY`
  );
  existsStub.restore();
  readStub.restore();
});

test('should return the file as a string if it includes the key', t => {
  const existsStub = sinon.stub(fs, 'existsSync');
  const readStub = sinon.stub(fs, 'readFileSync');
  const mockString = 'This does include the key 123456';
  const mockBuffer = Buffer.from(mockString, 'utf8');
  existsStub.returns(true);
  readStub.returns(mockBuffer);
  t.notThrows(() => {
    const fileString = getPreviousKeyFile('keylocation/thing.txt', '123456');
    t.is(fileString, mockString);
  });
  existsStub.restore();
  readStub.restore();
});
