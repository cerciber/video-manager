// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');

// Define table users
const TABLE = 'videos';
const USER_TABLE = 'users';

// List data
async function getVideoslistCase() {
  // Get gateway data
  const gatewayVideos = await gateway.loadMany(TABLE, {
    include: {
      user: {
        include: {
          authUser: true,
        },
      },
      comments: {
        include: {
          user: {
            include: {
              authUser: true,
            },
          },
        },
      },
      likes: {
        include: {
          user: {
            include: {
              authUser: true,
            },
          },
        },
      },
    },
  });

  // Format data to schema
  const videoSchema = gatewayVideos.map((video) => {
    return {
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      credits: video.credits,
      isPrivate: video.isPrivate,
      publicationDate: video.publicationDate,
      user: {
        userId: video.user.userId,
        username: video.user.authUser.username,
        name: video.user.name,
      },
      comments: video.comments.map((comment) => ({
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.user.authUser.username,
        name: comment.user.name,
        comment: comment.comment,
        publicationDate: comment.publicationDate,
      })),
      likes: video.likes.map((like) => ({
        likeId: like.likeId,
        userId: like.userId,
        username: like.user.authUser.username,
        name: like.user.name,
      })),
    };
  });

  // Return response
  return response.success(200, 'Videos retrieved successfully.', videoSchema);
}

// Get by id
async function getVideoByIdCase(videoId) {
  // Get gateway data
  const gatewayVideo = await gateway.loadMany(TABLE, {
    where: {
      videoId,
    },
    include: {
      user: {
        include: {
          authUser: true,
        },
      },
      comments: {
        include: {
          user: {
            include: {
              authUser: true,
            },
          },
        },
      },
      likes: {
        include: {
          user: {
            include: {
              authUser: true,
            },
          },
        },
      },
    },
  });

  // Check if video exist
  if (gatewayVideo && gatewayVideo.length > 0) {
    // Format data to schema
    const video = gatewayVideo[0];
    const videoRecoverDataFromatted = {
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      credits: video.credits,
      isPrivate: video.isPrivate,
      publicationDate: video.publicationDate,
      user: {
        userId: video.user.userId,
        username: video.user.authUser.username,
        name: video.user.name,
      },
      comments: video.comments.map((comment) => ({
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.user.authUser.username,
        name: comment.user.name,
        comment: comment.comment,
        publicationDate: comment.publicationDate,
      })),
      likes: video.likes.map((like) => ({
        likeId: like.likeId,
        userId: like.userId,
        username: like.user.authUser.username,
        name: like.user.name,
      })),
    };

    // Return response
    return response.success(
      200,
      'Video retrieved successfully.',
      videoRecoverDataFromatted
    );
  }

  // Return response
  return response.success(404, 'Video not exist.', {});
}

// Add
async function addVideoCase(userId, title, description, credits, isPrivate) {
  // Add gateway data
  const gatewayVideoAddedResponse = await gateway.saveOne(TABLE, {
    data: {
      userId,
      title,
      description,
      credits,
      isPrivate,
    },
  });

  // Video added
  if (gatewayVideoAddedResponse.status === 201) {
    // Recover data
    const video = await gateway.loadOne(TABLE, {
      where: {
        videoId: gatewayVideoAddedResponse.body.videoId,
      },
      include: {
        user: {
          include: {
            authUser: true,
          },
        },
        comments: {
          include: {
            user: {
              include: {
                authUser: true,
              },
            },
          },
        },
        likes: {
          include: {
            user: {
              include: {
                authUser: true,
              },
            },
          },
        },
      },
    });

    // Format data
    const videoRecoverDataFromatted = {
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      credits: video.credits,
      isPrivate: video.isPrivate,
      publicationDate: video.publicationDate,
      user: {
        userId: video.user.userId,
        username: video.user.authUser.username,
        name: video.user.name,
      },
      comments: video.comments.map((comment) => ({
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.user.authUser.username,
        name: comment.user.name,
        comment: comment.comment,
        publicationDate: comment.publicationDate,
      })),
      likes: video.likes.map((like) => ({
        likeId: like.likeId,
        userId: like.userId,
        username: like.user.authUser.username,
        name: like.user.name,
      })),
    };
    return response.success(
      201,
      'Video added successfully.',
      videoRecoverDataFromatted
    );
  }

  // Return response
  return gatewayVideoAddedResponse;
}

// Update by id
async function updateVideoCase(
  videoId,
  userId,
  title,
  description,
  credits,
  isPrivate
) {
  // Validate if user exist
  if (userId) {
    const newUser = await gateway.loadOne(USER_TABLE, {
      where: {
        userId,
      },
    });

    if (!newUser) {
      return response.error(404, 'Id of new user not exist.', {});
    }
  }

  // Update gateway data
  const updatedVideo = await gateway.update(TABLE, {
    where: {
      videoId,
    },
    data: {
      userId,
      title,
      description,
      credits,
      isPrivate,
    },
  });

  // If updated
  if (updatedVideo.status === 200) {
    // Recover data
    const video = await gateway.loadOne(TABLE, {
      where: {
        videoId: updatedVideo.body.videoId,
      },
      include: {
        user: {
          include: {
            authUser: true,
          },
        },
        comments: {
          include: {
            user: {
              include: {
                authUser: true,
              },
            },
          },
        },
        likes: {
          include: {
            user: {
              include: {
                authUser: true,
              },
            },
          },
        },
      },
    });

    // Format data
    const videoRecoverDataFromatted = {
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      credits: video.credits,
      isPrivate: video.isPrivate,
      publicationDate: video.publicationDate,
      user: {
        userId: video.user.userId,
        username: video.user.authUser.username,
        name: video.user.name,
      },
      comments: video.comments.map((comment) => ({
        commentId: comment.commentId,
        userId: comment.userId,
        username: comment.user.authUser.username,
        name: comment.user.name,
        comment: comment.comment,
        publicationDate: comment.publicationDate,
      })),
      likes: video.likes.map((like) => ({
        likeId: like.likeId,
        userId: like.userId,
        username: like.user.authUser.username,
        name: like.user.name,
      })),
    };
    return response.success(
      200,
      'Video updated successfully.',
      videoRecoverDataFromatted
    );
  }

  // Return response
  return updatedVideo;
}

// Remove by id
async function removeVideoCase(videoId) {
  // Get video
  const video = await gateway.loadOne(TABLE, {
    where: {
      videoId,
    },
  });

  // Check if video exist
  if (!video) {
    // Return response
    return response.success(404, 'Video not exist.', {});
  }

  // Delete gateway data
  await gateway.remove(TABLE, {
    where: {
      videoId,
    },
  });

  // Return response
  return response.success(200, 'Video deleted successfully.', {});
}

// Exports
module.exports = {
  getVideoslistCase,
  getVideoByIdCase,
  addVideoCase,
  updateVideoCase,
  removeVideoCase,
};
