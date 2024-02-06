// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  CommentNoIdNoUser: {
    title: 'CommentNoIdNoUser',
    type: 'object',
    properties: {
      videoId: {
        type: 'number',
      },
      comment: {
        type: 'string',
      },
    },
    example: {
      videoId: 1,
      comment: 'Excelent.',
    },
    required: ['videoId', 'comment'],
  },
});
