// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  CommentNoId: {
    title: 'CommentNoId',
    type: 'object',
    properties: {
      userId: {
        type: 'number',
      },
      videoId: {
        type: 'number',
      },
      comment: {
        type: 'string',
      },
    },
    example: {
      userId: 1,
      videoId: 1,
      comment: 'Excelent.',
    },
    required: ['userId', 'videoId', 'comment'],
  },
});
