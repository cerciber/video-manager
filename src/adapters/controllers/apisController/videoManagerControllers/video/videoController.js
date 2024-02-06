// Imports
const response = require('@src/adapters/presenters/response');
const {
  getVideoslistCase,
  getVideoByIdCase,
  addVideoCase,
  updateVideoCase,
} = require('@src/application/videoManagerApplication/videoCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validatePositiveIntegerString,
  validateSchema,
  validateObjectWithMinKeys,
} = require('@src/adapters/controllers/validation/validationFunctions');

// List data
async function getVideoslistController() {
  // Apply bussiness logic
  const usersResponse = await getVideoslistCase();

  // Return correct validation output
  return usersResponse;
}

// Get by id
async function getVideoByIdController(params) {
  // Get input
  const { videoId } = params;

  // Validate input
  const inputValidation = validate([
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
  const videoResponse = await getVideoByIdCase(Number(videoId));

  // Return output
  return videoResponse;
}

// Add
async function addVideoController(body) {
  // Get input
  const video = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['VideoNoId', video],
      'Video schema not have correct structure.',
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
  const addVideoResponse = await addVideoCase(
    video.userId,
    video.title,
    video.description,
    video.credits,
    video.isPrivate
  );

  // Return output
  return addVideoResponse;
}

// Update by id
async function updateVideoController(params, body) {
  // Get input
  const { videoId } = params;
  const video = body;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [videoId],
      'Param videoId not is an positive integer string type.',
    ],
    [
      validateObjectWithMinKeys,
      [video, 1],
      "UserAdminSiginUpNoIdOptional schema can't be empty.",
    ],
    [
      validateSchema,
      ['VideoNoIdOptional', video],
      'Schema not have VideoNoIdOptional structure.',
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
  const updateUserResponse = await updateVideoCase(
    Number(videoId),
    video.userId,
    video.title,
    video.description,
    video.credits,
    video.isPrivate
  );

  // Return output
  return updateUserResponse;
}

// Exports
module.exports = {
  getVideoslistController,
  getVideoByIdController,
  addVideoController,
  updateVideoController,
};
