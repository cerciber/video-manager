// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  LikeNoIdNoUser: {
    title: 'LikeNoIdNoUser',
    type: 'object',
    properties: {
      videoId: {
        type: 'number',
      },
    },
    example: {
      videoId: 1,
    },
    required: ['videoId'],
  },
});
