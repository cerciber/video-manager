// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');

// Define table likes
const TABLE = 'comments';
const VIDEO_TABLE = 'videos';
const USER_TABLE = 'users';

// Add
async function addCommentCase(userId, videoId, comment) {
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
  const gatewayCommentAddedResponse = await gateway.saveOne(TABLE, {
    data: {
      userId,
      videoId,
      comment,
    },
  });

  if (gatewayCommentAddedResponse.status === 201) {
    return response.success(
      201,
      'Comment added successfully.',
      gatewayCommentAddedResponse
    );
  }

  // Return response
  return gatewayCommentAddedResponse;
}

// Remove by id
async function removeCommentCase(commentId) {
  // Get comment
  const comment = await gateway.loadOne(TABLE, {
    where: {
      commentId,
    },
  });

  // Check if comment exist
  if (!comment) {
    // Return response
    return response.success(404, 'Comment not exist.', {});
  }

  // Delete gateway data
  await gateway.remove(TABLE, {
    where: {
      commentId,
    },
  });

  // Return response
  return response.success(200, 'Comment deleted successfully.', {});
}

// Remove own by id
async function removeMyCommentCase(commentId, userId) {
  // Get comment
  const comment = await gateway.loadOne(TABLE, {
    where: {
      commentId,
    },
  });

  // Check if comment exist
  if (!comment) {
    // Return response
    return response.success(404, 'Comment not exist.', {});
  }

  // Validate if comment belong to user
  const commentOwner = await gateway.loadOne(TABLE, {
    where: {
      commentId,
      userId,
    },
  });
  if (!commentOwner) {
    return response.error(401, 'This comment does not belong to you.', {});
  }

  // Delete gateway data
  await gateway.remove(TABLE, {
    where: {
      commentId,
    },
  });

  // Return response
  return response.success(200, 'Comment deleted successfully.', {});
}

// Exports
module.exports = {
  addCommentCase,
  removeCommentCase,
  removeMyCommentCase,
};
