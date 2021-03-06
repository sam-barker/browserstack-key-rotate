# Browserstack Key Rotate
A Node.js script that rotates your browserstack key.

## Pre-requisites
1. You must have a `BROWSERSTACK_KEY` environment variable setup in your shell session config e.g. `~/.bash_profile`.
2. You must have a `BROWSERSTACK_USER` environment variable setup as above.
3. `yarn` installed on your machine.
4. Node v10 or higher.

## Running
1. Check out the code.
2. Install the dependencies using `yarn install`
3. Run `KEY_LOCATION=<PATH_TO_FILE_WITH_BROWSERSTACK_KEY> yarn run rotate` to rotate your key.
4. Source the file where your `BROWSERSTACK_KEY` is present for changes to take effect.

## Cron job (Optional)
It is advised to rotate your key on a daily basis using `Cron`.
[Here](https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/) is a useful guide
on how to set up a cron job on your machine.

## Why can't the script find my file?
Use `$HOME` in your `KEY_LOCATION` environment variable, not `~`.

## Development
* `yarn run rotate` rotates your keys
* `yarn run lint:fix` runs prettier and fixes any errors
* `yarn run test:unit` will run ava unit tests
* `yarn run test` will run linting and unit tests
