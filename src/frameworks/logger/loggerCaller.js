// imports
const logger = require('./logger');

// Types
const types = {
  SYSTEM: 'SYSTEM',
  USER: 'USER',
};

// Info
function info(
  message,
  type = types.SYSTEM,
  category = 'default',
  action = 'none',
  content = null
) {
  logger.info(message, {
    content,
    type,
    category,
    action,
  });
}

// Warning
function warn(
  message,
  type = types.SYSTEM,
  category = 'default',
  action = 'none',
  content = null
) {
  logger.warn(message, {
    content,
    type,
    category,
    action,
  });
}

// Error
function error(
  message,
  type = types.SYSTEM,
  category = 'default',
  action = 'none',
  content = null
) {
  logger.error(message, {
    content,
    type,
    category,
    action,
  });
}

// Exports
module.exports = { info, warn, error, types };
