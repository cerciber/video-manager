// Imports
const response = require('@src/adapters/presenters/response');
const {
  addLikeCase,
  removeLikeCase,
} = require('@src/application/videoManagerApplication/likeCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validatePositiveIntegerString,
  validateSchema,
} = require('@src/adapters/controllers/validation/validationFunctions');

// Add
async function addLikeController(body) {
  // Get input
  const like = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['LikeNoId', like],
      'Like schema not have correct structure.',
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
  const addLikeResponse = await addLikeCase(like.userId, like.videoId);

  if (addLikeResponse.status === 201) {
    return response.success(201, 'Like added successfully.', {});
  }

  // Return output
  return addLikeResponse;
}

// Remove by id
async function removeLikeController(params) {
  // Get input
  const { userId, videoId } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [userId],
      'Param userId not is an positive integer string type.',
    ],
    [
      validatePositiveIntegerString,
      [videoId],
      'Param videoId not is an positive integer string type.',
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
  const deleteVideoResponse = await removeLikeCase(
    Number(userId),
    Number(videoId)
  );

  // Return correct validation output
  return deleteVideoResponse;
}

// Exports
module.exports = {
  addLikeController,
  removeLikeController,
};
