// Imports
const response = require('@src/adapters/presenters/response');
const {
  validateAccessCase,
  getPathDataCase,
} = require('@src/application/videoManagerApplication/authAccessCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateType,
  validateRegex,
} = require('@src/adapters/controllers/validation/validationFunctions');

// Constants
const BEARER_REGEX = /^Bearer\s+/i;

// Get
async function validateAccessController(basePath, method, headers) {
  // Get input
  const { authorization } = headers;

  // Validate basepath input
  const basePathInputValidation = validate([
    [validateType, ['string', basePath], 'Base Path is not an string.'],
    [validateNonEmptyString, [basePath], 'Base Path is an empty string value.'],
    [validateType, ['string', method], 'HTTP method is not an string.'],
    [validateNonEmptyString, [method], 'HTTP method is an empty string value.'],
  ]);

  // Return incorrect validation input
  if (!basePathInputValidation.valid) {
    return response.error(
      400,
      basePathInputValidation.badMessage,
      basePathInputValidation.details
    );
  }

  // Get path data
  const pathDataResponse = await getPathDataCase(basePath);

  // Check if path not exist or is public
  if (pathDataResponse.status !== 401) {
    // Return output
    return pathDataResponse;
  }

  // Validate headers input
  const inputValidation = validate([
    [
      validateType,
      ['string', authorization],
      'Access denied. Token not provided. Header authorization is not an string.',
    ],
    [
      validateNonEmptyString,
      [authorization],
      'Access denied. Token not provided. Header authorization is an empty string value.',
    ],
    [
      validateRegex,
      [BEARER_REGEX, authorization],
      'Access denied. Token not provided. Header authorization is not in a Bearer token from.',
    ],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      401,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const validateAccessResponse = await validateAccessCase(
    basePath,
    method,
    authorization.split(BEARER_REGEX)[1]
  );

  // Return output
  return validateAccessResponse;
}

// Exports
module.exports = {
  validateAccessController,
};
