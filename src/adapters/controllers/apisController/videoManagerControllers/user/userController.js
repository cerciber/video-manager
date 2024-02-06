// Imports
const response = require('@src/adapters/presenters/response');
const {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
} = require('@src/application/videoManagerApplication/userCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateSchema,
  validatePositiveIntegerString,
  validateStringInOptions,
  validateStringOrUndefinedInOptions,
  validateObjectWithMinKeys,
} = require('@src/adapters/controllers/validation/validationFunctions');

// List data
async function getUserslistController() {
  // Apply bussiness logic
  const usersResponse = await getUserslistCase();

  // Return correct validation output
  return usersResponse;
}

// Get by id
async function getUserByIdController(params) {
  // Get input
  const { userId } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [userId],
      'Param userId not is an positive integer string type.',
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
  const userResponse = await getUserByIdCase(Number(userId));

  // Return output
  return userResponse;
}

// Add
async function addUserController(body) {
  // Get input
  const user = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['UserAdminSiginUpNoId', user],
      'User schema not have correct structure.',
    ],
    [
      validateStringInOptions,
      [user.rol, ['admin', 'common']],
      'User rol field is not a valid rol.',
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
  const addUserResponse = await addUserCase(
    user.username,
    user.rol,
    user.password,
    user.name,
    user.email,
    user.cellphone
  );

  // Return output
  return addUserResponse;
}

// Update by id
async function updateUserController(params, body) {
  // Get input
  const { userId } = params;
  const user = body;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [userId],
      'Param userId not is an positive integer string type.',
    ],
    [
      validateObjectWithMinKeys,
      [user, 1],
      "UserAdminSiginUpNoIdOptional schema can't be empty.",
    ],
    [
      validateSchema,
      ['UserAdminSiginUpNoIdOptional', user],
      'Schema not have UserAdminSiginUpNoIdOptional structure.',
    ],
    [
      validateStringOrUndefinedInOptions,
      [user.rol, ['admin', 'common']],
      'User rol field is not a valid rol.',
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
  const updateUserResponse = await updateUserCase(
    Number(userId),
    user.username,
    user.rol,
    user.password,
    user.name,
    user.email,
    user.cellphone
  );

  // Return output
  return updateUserResponse;
}

// Remove by id
async function removeUserController(params) {
  // Get input
  const { userId } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [userId],
      'Param userId not is an positive integer string type.',
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
  const deleteUserResponse = await removeUserCase(Number(userId));

  // Return correct validation output
  return deleteUserResponse;
}

// Exports
module.exports = {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
};
