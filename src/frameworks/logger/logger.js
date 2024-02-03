// Imports
const path = require('path');
const { createLogger, format, transports } = require('winston');
const config = require('@src/utils/statics/config');

// Create logger
const logger = createLogger({
  // Asign store mechanisms
  transports: [
    // By files
    new transports.File({
      maxsize: config.frameworks.logger.winston.maxBitsPerFile,
      maxFiles: config.frameworks.logger.winston.maxFiles,
      filename: `${path.resolve()}/logs/log.log`,
      // Set format
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata(),
        format.printf((info) => {
          return `[${info.metadata.timestamp}] [${info.level.toUpperCase()}] [${
            info.metadata.type
          }] [${info.metadata.category}:${info.metadata.action}] \n  → ${
            info.message
          } ${
            info.metadata.content
              ? `\n  → ${info.metadata.content.replace(/\n/g, '\n    ')}`
              : ''
          }`;
        })
      ),
    }),

    // By console
    new transports.Console({
      // Set format
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata(),
        format.printf((info) => {
          let label = info.level.toUpperCase();
          // Set colors
          switch (info.level.toUpperCase()) {
            case 'INFO':
              label = `\x1b[37m[${label}]`;
              break;
            case 'WARN':
              label = `\x1b[33m[${label}]`;
              break;
            case 'ERROR':
              label = `\x1b[31m[${label}]`;
              break;
            default:
          }
          return `\x1b[32m[${info.metadata.timestamp}] ${label} \x1b[36m[${
            info.metadata.type
          }] \x1b[35m[${info.metadata.category}:${
            info.metadata.action
          }] \x1b[37m\n  → ${info.message} ${
            info.metadata.content
              ? `\n  → ${info.metadata.content.replace(/\n/g, '\n    ')}`
              : ''
          }`;
        })
      ),
    }),
  ],
});

// Exports
module.exports = logger;
