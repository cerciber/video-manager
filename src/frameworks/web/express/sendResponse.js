// Imports
const logger = require('@src/frameworks/logger/loggerCaller');

// Exports
module.exports = (req, res, body) => {
  // Logs
  if (body.status !== 500) {
    logger.info(
      `Response on endpoint [${req.method}]:${req.originalUrl}`,
      logger.types.USER,
      'endpoint',
      'response'
      // `Response: ${JSON.stringify(body, null, 2)}`
    );
  } else {
    logger.error(
      `Response on endpoint [${req.method}]:${req.originalUrl}`,
      logger.types.USER,
      'endpoint',
      'response',
      `Response: ${JSON.stringify(body, null, 2)}\nError: ${body?.body?.stack}`
    );
  }

  // Send response
  res.status(body.status).send(body);
};
