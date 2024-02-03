module.exports = {
  // Paths to scan swagger docs
  SWAGGER_SCAN_PATHS: ['./src/frameworks/web/express/routes/**/*.js'],

  // Paths to scan schemas
  SCHEMAS_SCAN_PATHS: [
    '@src/adapters/schemas/gitHubApiSchemas',
    '@src/adapters/schemas/response',
  ],
};
