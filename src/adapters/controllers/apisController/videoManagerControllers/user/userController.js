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
  validateNonEmptyString,
  validateType,
  validateSchema,
  validateObjectKeys,
  validatePositiveIntegerString,
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
  const { user } = body;

  // Validate input
  const inputValidation = validate([
    [
      validateObjectKeys,
      [body, ['user']],
      'Body is not an key object type with specific keys.',
    ],
    [validateSchema, ['User', user], 'User schema not have correct structure.'],
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
  const addUserResponse = await addUserCase(user);

  // Return output
  return addUserResponse;
}

// Update by id
async function updateUserController(params, body) {
  // Get input
  const { id } = params;
  const { user } = body;

  // Validate input
  const inputValidation = validate([
    [validateType, ['string', id], 'Param id not is an string type.'],
    [validateNonEmptyString, [id], 'Param id is an empty string value.'],
    [
      validateObjectKeys,
      [body, ['user']],
      'Body is not an key object type with specific keys.',
    ],
    [validateSchema, ['User', user], 'User schema not have correct structure.'],
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
  const updateUserResponse = await updateUserCase(id, user);

  // Return output
  return updateUserResponse;
}

// Remove by id
async function removeUserController(params) {
  // Get input
  const { id } = params;

  // Validate input
  const inputValidation = validate([
    [validateType, ['string', id], 'Param id not is an string type.'],
    [validateNonEmptyString, [id], 'Param id is an empty string value.'],
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
  const deleteUserResponse = await removeUserCase(id);

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
