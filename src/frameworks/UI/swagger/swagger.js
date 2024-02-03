// Imports
const swaggerUi = require('swagger-ui-express');
const getSwaggerData = require('./getSwaggerData');

// Exports
module.exports = {
  serve: swaggerUi.serve,
  UISetup: swaggerUi.setup(getSwaggerData()),
};
