// Imports
const response = require('@src/adapters/presenters/response');
const sendResponse = require('@src/frameworks/web/express/sendResponse');

// Express error middleware
const pathNoFoundMiddleware = async (req, res) => {
  sendResponse(req, res, response.error(404, 'Path no found.', {}));
};

// Exports
module.exports = pathNoFoundMiddleware;
