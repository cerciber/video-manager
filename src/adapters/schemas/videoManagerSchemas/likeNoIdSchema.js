// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  LikeNoId: {
    title: 'LikeNoId',
    type: 'object',
    properties: {
      userId: {
        type: 'number',
      },
      videoId: {
        type: 'number',
      },
    },
    example: {
      userId: 1,
      videoId: 1,
    },
    required: ['userId', 'videoId'],
  },
});
