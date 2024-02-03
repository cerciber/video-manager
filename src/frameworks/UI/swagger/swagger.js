// Imports
const swaggerUi = require('swagger-ui-express');
const getSwaggerData = require('./getSwaggerData');

// Exports
// console.dir(getSwaggerData(), { depth: null });
module.exports = {
  serve: swaggerUi.serve,
  UISetup: swaggerUi.setup(getSwaggerData()),
};
