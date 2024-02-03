// Imports
const response = require('@src/adapters/presenters/response');
const sendResponse = require('@src/frameworks/web/express/sendResponse');

// Express error middleware
const errorMiddleware = async (err, req, res, next) => {
  sendResponse(
    req,
    res,
    response.error(500, 'An error occurred on server.', {
      message: err.message,
      stack: err.stack,
    })
  );
  return next();
};

// Exports
module.exports = errorMiddleware;
