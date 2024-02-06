// Imports
const response = require('@src/adapters/presenters/response');
const {
  getVideoslistCase,
  getVideoByIdCase,
  addVideoCase,
  updateVideoCase,
  removeVideoCase,
  getUserVideoslistCase,
  updateMyVideoCase,
  removeMyVideoCase,
  getTopRatedVideoslistCase,
  getPrivateVideoslistCase,
  getPublicVideoslistCase,
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

// List private data
async function getPrivateVideoslistController() {
  // Apply bussiness logic
  const usersResponse = await getPrivateVideoslistCase();

  // Return correct validation output
  return usersResponse;
}

// List private data
async function getPublicVideoslistController() {
  // Apply bussiness logic
  const usersResponse = await getPublicVideoslistCase();

  // Return correct validation output
  return usersResponse;
}

// List data
async function getTopRatedVideoslistController(params) {
  // Get input
  const { numTop } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [numTop],
      'Param numTop not is an positive integer string type.',
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
  const usersResponse = await getTopRatedVideoslistCase(Number(numTop));

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

// Get by id
async function getVideosByUserIdController(params) {
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
  const videoResponse = await getUserVideoslistCase(Number(userId));

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
  const updateVideoResponse = await updateVideoCase(
    Number(videoId),
    video.userId,
    video.title,
    video.description,
    video.credits,
    video.isPrivate
  );

  // Return output
  return updateVideoResponse;
}

// Update own by id
async function updateMyVideoController(params, body) {
  // Get input
  const { videoId, userId } = params;
  const video = body;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [videoId],
      'Param videoId not is an positive integer string type.',
    ],
    [
      validatePositiveIntegerString,
      [userId],
      'Param userId not is an positive integer string type.',
    ],
    [
      validateObjectWithMinKeys,
      [video, 1],
      "VideoNoIdNoUserOptional schema can't be empty.",
    ],
    [
      validateSchema,
      ['VideoNoIdNoUserOptional', video],
      'Schema not have VideoNoIdNoUserOptional structure.',
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
  const updateVideoResponse = await updateMyVideoCase(
    Number(videoId),
    Number(userId),
    video.title,
    video.description,
    video.credits,
    video.isPrivate
  );

  // Return output
  return updateVideoResponse;
}

// Remove by id
async function removeVideoController(params) {
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
  const deleteVideoResponse = await removeVideoCase(Number(videoId));

  // Return correct validation output
  return deleteVideoResponse;
}

// Remove own by id
async function removeMyVideoController(params) {
  // Get input
  const { videoId, userId } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [videoId],
      'Param videoId not is an positive integer string type.',
    ],
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
  const deleteVideoResponse = await removeMyVideoCase(
    Number(userId),
    Number(videoId)
  );

  // Return correct validation output
  return deleteVideoResponse;
}

// Exports
module.exports = {
  getVideoslistController,
  getVideosByUserIdController,
  getVideoByIdController,
  addVideoController,
  updateVideoController,
  removeVideoController,
  updateMyVideoController,
  removeMyVideoController,
  getTopRatedVideoslistController,
  getPrivateVideoslistController,
  getPublicVideoslistController,
};
