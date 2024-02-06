// Express server
const { close } = require('@src/frameworks/web/express/express');

module.exports = async () => {
  // Close connection
  close();
  // eslint-disable-next-line no-console
  console.log('Express stoped.');
};
