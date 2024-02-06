// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');

// Define table likes
const TABLE = 'likes';
const VIDEO_TABLE = 'videos';
const USER_TABLE = 'users';

// Add
async function addLikeCase(userId, videoId) {
  // Get video
  const video = await gateway.loadOne(VIDEO_TABLE, {
    where: {
      videoId,
    },
  });

  // Check if video exist
  if (!video) {
    // Return response
    return response.success(404, 'Video not exist.', {});
  }

  // Get user
  const user = await gateway.loadOne(USER_TABLE, {
    where: {
      userId,
    },
  });

  // Check if user exist
  if (!user) {
    // Return response
    return response.success(404, 'User not exist.', {});
  }

  // Add gateway data
  const gatewayLikeAddedResponse = await gateway.saveOne(TABLE, {
    data: {
      userId,
      videoId,
    },
  });

  if (gatewayLikeAddedResponse.status === 201) {
    return response.success(200, 'Like added successfully.', {});
  }

  if (gatewayLikeAddedResponse.status === 409) {
    return response.success(409, 'The user has already liked this video.', {});
  }

  // Return response
  return gatewayLikeAddedResponse;
}

// Remove by id
async function removeLikeCase(userId, videoId) {
  // Get video
  const video = await gateway.loadOne(VIDEO_TABLE, {
    where: {
      videoId,
    },
  });

  // Check if video exist
  if (!video) {
    // Return response
    return response.success(404, 'Video not exist.', {});
  }

  // Get user
  const user = await gateway.loadOne(USER_TABLE, {
    where: {
      userId,
    },
  });

  // Check if user exist
  if (!user) {
    // Return response
    return response.success(404, 'User not exist.', {});
  }

  // Get like
  const like = await gateway.loadOne(TABLE, {
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });

  // Check if like exist
  if (!like) {
    // Return response
    return response.success(404, 'Like not exist.', {});
  }

  // Delete gateway data
  await gateway.remove(TABLE, {
    where: {
      userId,
      videoId,
    },
  });

  // Return response
  return response.success(200, 'Like deleted successfully.', {});
}

// Exports
module.exports = {
  addLikeCase,
  removeLikeCase,
};
