// Imports
const response = require('@src/adapters/presenters/response');
const {
  validateAccessCase,
  getPathDataCase,
} = require('@src/application/videoManagerApplication/authAccessCases');
const {
  validate,
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateResponse,
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
    // Validate output
    const outputValidation = validateByStatus(pathDataResponse.status, {
      200: [
        [
          validateResponse,
          [200, pathDataResponse, {}],
          `Response not have correct structure.`,
        ],
      ],
      404: [
        [
          validateResponse,
          [404, pathDataResponse, {}],
          `Response not have correct structure.`,
        ],
      ],
    });

    // Return incorrect validation output
    if (!outputValidation.valid) {
      return response.error(
        500,
        outputValidation.badMessage,
        outputValidation.details
      );
    }

    // Return correct validation output
    return pathDataResponse;
  }

  // Validate headers input
  const inputValidation = validate([
    [
      validateType,
      ['string', authorization],
      'Access denied. Header authorization is not an string.',
    ],
    [
      validateNonEmptyString,
      [authorization],
      'Access denied. Header authorization is an empty string value.',
    ],
    [
      validateRegex,
      [BEARER_REGEX, authorization],
      'Access denied. Header authorization is not in a Bearer token from.',
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

  // Validate output
  const outputValidation = validateByStatus(validateAccessResponse.status, {
    200: [
      [
        validateResponse,
        [200, validateAccessResponse, { tokenPayload: 'TokenPayload' }],
        `Response not have correct structure.`,
      ],
    ],
    401: [
      [
        validateResponse,
        [401, validateAccessResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return validateAccessResponse;
}

// Exports
module.exports = {
  validateAccessController,
};
