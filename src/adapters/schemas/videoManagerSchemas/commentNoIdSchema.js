// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  Comment: {
    title: 'Comment',
    type: 'object',
    properties: {
      commentId: {
        type: 'number',
      },
      userId: {
        type: 'number',
      },
      videoId: {
        type: 'number',
      },
      comment: {
        type: 'string',
      },
      publicationDate: {
        type: 'string',
      },
    },
    example: {
      commentId: 1,
      userId: 1,
      videoId: 1,
      comment: 'Excelent.',
      publicationDate: '2024-02-06T13:44:32.342Z',
    },
    required: ['commentId', 'userId', 'videoId', 'comment', 'publicationDate'],
  },
});
