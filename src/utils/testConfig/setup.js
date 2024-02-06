require('module-alias/register');
require('dotenv').config();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { listen } = require('@src/frameworks/web/express/express');

module.exports = async () => {
  // Resdet database
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

  // Listen express
  listen();
  // eslint-disable-next-line no-console
  console.log('Express running.');
};
