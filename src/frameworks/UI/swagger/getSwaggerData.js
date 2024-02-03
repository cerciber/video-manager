// Imports
const swaggerJsdoc = require('swagger-jsdoc');
const paths = require('@src/utils/statics/paths');
const constants = require('@src/utils/statics/constants');
const config = require('@src/utils/statics/config');
const {
  loadSchemasFromFolder,
  loadSchemasFromFolders,
} = require('./loadSchemasFromFolder');

// Get Swagger Data
function getSwaggerData() {
  // Load schemas
  const dataSchemas = loadSchemasFromFolders(constants.SCHEMAS_SCAN_PATHS);

  // Load response schemas
  const responseSchemas = loadSchemasFromFolder(
    '@src/adapters/schemas/response/responseSchemas/httpResponseSchemas'
  );

  // Swagger data import
  // eslint-disable-next-line global-require
  const swaggerData = require('@src/utils/statics/swagger');

  // Set Schemas
  swaggerData.components.schemas = dataSchemas;

  // Set response schemas
  swaggerData.components.responses = responseSchemas;

  // Set url
  swaggerData.servers = [
    {
      url: `${config.frameworks.web.express.url}/`,
    },
  ];

  // Set Swagger config
  const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: swaggerData,
    apis: constants.SWAGGER_SCAN_PATHS,
  });

  // Change paths references
  Object.keys(swaggerDocs.paths).forEach((path) => {
    const match = path.match(/\${([^}]+)}/);
    if (match) {
      const value = match[1];
      const expresionToReplace = match[0];
      const resultPath = path.replace(expresionToReplace, paths[value].path);
      swaggerDocs.paths[resultPath] = swaggerDocs.paths[path];
      delete swaggerDocs.paths[path];
    }
  });

  return swaggerDocs;
}

// Exports
module.exports = getSwaggerData;
