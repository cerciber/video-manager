// Imports
const response = require('@src/adapters/presenters/response');
const {
  signinUserAuthCase,
  signupUserAuthCase,
} = require('@src/application/videoManagerApplication/authUserCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateSchema,
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

  // Return correct validation output
  return addUserResponse;
}

// Exports
module.exports = {
  signinUserAuthController,
  signupUserAuthController,
};
