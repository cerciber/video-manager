const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Set import alias
require('module-alias/register');

// Add enviroment variables
require('dotenv').config();

// Express server
const { listen } = require('@src/frameworks/web/express/express');

module.exports = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Reset database in process...');
    await exec('npm run prisma:reset');
    // eslint-disable-next-line no-console
    console.log('Reset database complete.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  listen();
  // eslint-disable-next-line no-console
  console.log('Express running.');
};
