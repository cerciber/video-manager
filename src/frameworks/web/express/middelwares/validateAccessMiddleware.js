// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  validateAccessController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/auth/validateAccessController');
const logger = require('@src/frameworks/logger/loggerCaller');

// Get get base path from express router path
function getBasePath(expressRouterPath) {
  return expressRouterPath.replace(/\/:[^/]+/g, '');
}

// Express validate access middleware
const validateAccessMiddleware = async (req, res, next) => {
  // Logs
  logger.info(
    `Request on endpoint [${req.method}]:${req.originalUrl}`,
    logger.types.USER,
    'endpoint',
    'request',
    `Input: ${JSON.stringify({ body: req.body, params: req.params }, null, 2)}`
  );

  // Validate access
  const validationResult = await validateAccessController(
    getBasePath(req.route.path),
    req.method,
    req.headers
  );

  // Response denied access
  if (validationResult.status !== 200) {
    return sendResponse(req, res, validationResult);
  }

  // Asign token payload to request
  if (!req.body) {
    req.body = {};
  }
  if (validationResult.body?.tokenPayload) {
    req.tokenPayload = validationResult.body.tokenPayload;
  }

  // Continue
  return next();
};

// Exports
module.exports = validateAccessMiddleware;
