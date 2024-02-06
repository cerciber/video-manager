// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  VideoNoUser: {
    title: 'VideoNoUser',
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
    },
    example: {
      videoId: 1,
      title: 'Video 1',
      description: 'Description video 1',
      credits: 'Credit 1, Credit 2',
      isPrivate: true,
    },
    required: ['videoId', 'title', 'isPrivate'],
  },
});
