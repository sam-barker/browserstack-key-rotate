/**
 * Gets the environment variables if they're defined
 */
const getEnvVars = () => {
  const { BROWSERSTACK_KEY, BROWSERSTACK_USER, KEY_LOCATION } = process.env;

  if (!(BROWSERSTACK_KEY && BROWSERSTACK_USER)) {
    throw new Error(
      'Error: BROWSERSTACK_KEY or BROWSERSTACK_USER environment variables are not set'
    );
  }

  if (!KEY_LOCATION) {
    throw new Error(
      'Error: Please specify where your BROWSERSTACK_KEY is set using the KEY_LOCATION environment variable'
    );
  }
  return { BROWSERSTACK_KEY, BROWSERSTACK_USER, KEY_LOCATION };
};

module.exports = {
  getEnvVars
};
