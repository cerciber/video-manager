// Imports
const response = require('@src/adapters/presenters/response');
const {
  signinUserAuthCase,
  signupUserAuthCase,
} = require('@src/application/videoManagerApplication/authUserCases');
const {
  validate,
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateResponse,
  validateSchema,
  validateObjectKeys,
} = require('@src/adapters/controllers/validation/validationFunctions');

// Get
async function signinUserAuthController(body) {
  // Get input
  const userAuth = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['UserAuthNoId', userAuth],
      'UserAuthNoId schema not have correct structure.',
    ],
    [
      validateNonEmptyString,
      [userAuth?.username],
      'Param username is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userAuth?.password],
      'Param password is an empty string value.',
    ],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      400,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const userAuthResponse = await signinUserAuthCase(
    userAuth.username,
    userAuth.password
  );

  // Validate output
  const outputValidation = validateByStatus(userAuthResponse.status, {
    200: [
      [
        validateResponse,
        [200, userAuthResponse, { token: 'Token' }],
        `Response not have correct structure.`,
      ],
    ],
    404: [
      [
        validateResponse,
        [404, userAuthResponse, {}],
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
  return userAuthResponse;
}

// Add
async function signupUserAuthController(body) {
  // Get input
  const { userAuth } = body;

  // Validate input
  const inputValidation = validate([
    [
      validateObjectKeys,
      [body, ['userAuth']],
      'Body is not an key object type with specific keys.',
    ],
    [
      validateSchema,
      ['UserAuthNoId', userAuth],
      'UserAuthNoId schema not have correct structure.',
    ],
    [
      validateNonEmptyString,
      [userAuth?.username],
      'Param username is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userAuth?.password],
      'Param password is an empty string value.',
    ],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      400,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const addUserResponse = await signupUserAuthCase(
    userAuth.username,
    userAuth.password
  );

  // Validate output
  const outputValidation = validateByStatus(addUserResponse.status, {
    201: [
      [
        validateResponse,
        [201, addUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
    409: [
      [
        validateResponse,
        [409, addUserResponse, {}],
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
  return addUserResponse;
}

// Exports
module.exports = {
  signinUserAuthController,
  signupUserAuthController,
};
