// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  VideoNoIdNoUser: {
    title: 'VideoNoIdNoUser',
    type: 'object',
    properties: {
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
      title: 'Video 1',
      description: 'Description video 1',
      credits: 'Credit 1, Credit 2',
      isPrivate: true,
    },
    required: ['title', 'isPrivate'],
  },
});
