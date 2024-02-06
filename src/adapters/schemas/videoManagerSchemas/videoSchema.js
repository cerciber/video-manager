// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  Video: {
    title: 'Video',
    type: 'object',
    properties: {
      videoId: {
        type: 'number',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      credits: {
        type: 'string',
      },
      isPrivate: {
        type: 'boolean',
      },
      publicationDate: {
        type: 'string',
      },
      user: {
        type: 'object',
        properties: {
          userId: {
            type: 'number',
          },
          username: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      comments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            commentId: {
              type: 'number',
            },
            userId: {
              type: 'number',
            },
            username: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            comment: {
              type: 'string',
            },
            publicationDate: {
              type: 'string',
            },
          },
        },
      },
      likes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            likeId: {
              type: 'number',
            },
            userId: {
              type: 'number',
            },
            username: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
          },
        },
      },
    },
    example: {
      videoId: 1,
      title: 'Video 1',
      description: 'Description video 1',
      credits: 'Credit 1, Credit 2',
      isPrivate: true,
      publicationDate: '2024-02-05T23:40:10.856Z',
      user: {
        userId: 41,
        username: 'cesar123',
        name: 'Cesar',
      },
      comments: [
        {
          commentId: 41,
          userId: 41,
          username: 'cesar123',
          name: 'Cesar',
          comment: "Wow, didn't expect that! This video is a wild ride.",
          publicationDate: '2024-02-05T23:40:10.856Z',
        },
        {
          commentId: 41,
          userId: 41,
          username: 'cesar123',
          name: 'Cesar',
          comment: "Wow, didn't expect that! This video is a wild ride.",
          publicationDate: '2024-02-05T23:40:10.856Z',
        },
        {
          commentId: 41,
          userId: 41,
          username: 'cesar123',
          name: 'Cesar',
          comment: "Wow, didn't expect that! This video is a wild ride.",
          publicationDate: '2024-02-05T23:40:10.856Z',
        },
      ],
      likes: [
        {
          likeId: 1,
          userId: 1,
          username: 'cesar123',
          name: 'Cesar',
        },
        {
          likeId: 1,
          userId: 1,
          username: 'cesar123',
          name: 'Cesar',
        },
        {
          likeId: 1,
          userId: 1,
          username: 'cesar123',
          name: 'Cesar',
        },
      ],
    },
    required: [
      'videoId',
      'title',
      'description',
      'credits',
      'isPrivate',
      'publicationDate',
      'user',
      'comments',
      'likes',
    ],
  },
});
