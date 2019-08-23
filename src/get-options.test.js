const test = require('ava');
const { getOptions } = require('./get-options');

test('should correctly set auth headers', t => {
  const bstackUser = 'My user';
  const bstackKey = 'My key';
  const options = getOptions(bstackUser, bstackKey);
  t.is(options.headers.get('Authorization'), 'Basic TXkgdXNlcjpNeSBrZXk=');
  t.is(options.method, 'PUT');
});
