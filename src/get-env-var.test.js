const test = require('ava');
const { getEnvVars } = require('./get-env-vars');

/**
 * Reset all of our environment variables
 */
const resetEnvVars = () => {
  delete process.env.BROWSERSTACK_KEY;
  delete process.env.BROWSERSTACK_USER;
  delete process.env.KEY_LOCATION;
};

test('should throw an error if BROWSERSTACK_KEY is not defined', t => {
  resetEnvVars();
  process.env.BROWSERSTACK_USER = 'Test User';
  const error = t.throws(() => getEnvVars(), Error);
  t.is(
    error.message,
    'Error: BROWSERSTACK_KEY or BROWSERSTACK_USER environment variables are not set'
  );
});

test('should throw an error if BROWSERSTACK_USER is not defined', t => {
  resetEnvVars();
  process.env.BROWSERSTACK_KEY = 'Test Key';
  const error = t.throws(() => getEnvVars(), Error);
  t.is(
    error.message,
    'Error: BROWSERSTACK_KEY or BROWSERSTACK_USER environment variables are not set'
  );
});

test('should throw an error if KEY_LOCATION is not defined', t => {
  resetEnvVars();
  process.env.BROWSERSTACK_USER = 'Test User';
  process.env.BROWSERSTACK_KEY = 'Test Key';
  const error = t.throws(() => getEnvVars(), Error);
  t.is(
    error.message,
    'Error: Please specify where your BROWSERSTACK_KEY is set using the KEY_LOCATION environment variable'
  );
});

test('should return environment variables if all are defined', t => {
  resetEnvVars();
  process.env.BROWSERSTACK_USER = 'Test User';
  process.env.BROWSERSTACK_KEY = 'Test Key';
  process.env.KEY_LOCATION = 'somewhere/thing/file.txt';
  t.notThrows(() => {
    const { BROWSERSTACK_USER, BROWSERSTACK_KEY, KEY_LOCATION } = getEnvVars();
    t.is(BROWSERSTACK_KEY, process.env.BROWSERSTACK_KEY);
    t.is(BROWSERSTACK_USER, process.env.BROWSERSTACK_USER);
    t.is(KEY_LOCATION, process.env.KEY_LOCATION);
  });
});
