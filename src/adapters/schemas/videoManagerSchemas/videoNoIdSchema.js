// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  VideoNoId: {
    title: 'VideoNoId',
    type: 'object',
    properties: {
      userId: {
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
      userId: 1,
      title: 'Video 1',
      description: 'Description video 1',
      credits: 'Credit 1, Credit 2',
      isPrivate: true,
    },
    required: ['userId', 'title', 'isPrivate'],
  },
});
