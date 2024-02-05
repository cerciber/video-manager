// Imports
const logger = require('@src/frameworks/logger/loggerCaller');

// Format message
function formatMessage(message) {
  let newMessage = message;
  newMessage = newMessage.charAt(0).toUpperCase() + newMessage.slice(1);
  if (newMessage.charAt(newMessage.length - 1) !== '.') {
    newMessage += '.';
  }
  return newMessage;
}

// Exports
module.exports = (req, res, body) => {
  // Logs
  if (!body.error) {
    logger.info(
      `Response on endpoint [${req.method}]:${req.originalUrl}`,
      logger.types.USER,
      'endpoint',
      'response',
      `Response: ${JSON.stringify(body, null, 2)}`
    );

    // Send response
    res.status(body.status).send({
      status: body.status,
      message: body.message,
      error: body.error,
      body: body.body,
    });
  } else {
    logger.error(
      `Response on endpoint [${req.method}]:${req.originalUrl}`,
      logger.types.USER,
      'endpoint',
      'response',
      `Response: ${JSON.stringify(body, null, 2)}\nError: ${body?.body?.stack}`
    );

    // Send response
    res.status(body.status).send({
      status: body.status,
      message: formatMessage(body?.body?.errors?.[0].message ?? body.message),
      error: body.error,
      body: {},
    });
  }
};
