// Imports
const response = require('@src/adapters/presenters/response');
const sendResponse = require('@src/frameworks/web/express/sendResponse');

// Express error middleware
const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    sendResponse(
      req,
      res,
      response.error(400, 'JSON bad format.', {
        message: err.message,
        stack: err.stack,
      })
    );
  } else {
    sendResponse(
      req,
      res,
      response.error(500, 'An error occurred on server.', {
        message: err.message,
        stack: err.stack,
      })
    );
  }

  return next();
};

// Exports
module.exports = errorMiddleware;
