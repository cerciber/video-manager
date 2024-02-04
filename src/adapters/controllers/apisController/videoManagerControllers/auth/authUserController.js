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
        [200, userAuthResponse],
        `Response not have correct structure.`,
      ],
      [
        validateObjectKeys,
        [userAuthResponse?.body, ['token']],
        `Response not have correct structure.`,
      ],
      [
        validateNonEmptyString,
        [userAuthResponse?.body?.token],
        'Param token is an empty string value.',
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
  const userSiginUpNoId = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['UserSiginUpNoId', userSiginUpNoId],
      'UserAuthNoId schema not have correct structure.',
    ],
    [
      validateNonEmptyString,
      [userSiginUpNoId?.username],
      'Param username is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userSiginUpNoId?.password],
      'Param password is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userSiginUpNoId?.name],
      'Param name is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userSiginUpNoId?.email],
      'Param email is an empty string value.',
    ],
    [
      validateNonEmptyString,
      [userSiginUpNoId?.cellphone],
      'Param cellphone is an empty string value.',
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
    userSiginUpNoId.username,
    userSiginUpNoId.password,
    userSiginUpNoId.name,
    userSiginUpNoId.email,
    userSiginUpNoId.cellphone
  );
  console.log(addUserResponse);

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
