// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  Response: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 1,
      },
      message: {
        type: 'string',
        example: 'Result operation.',
      },
      error: {
        type: 'boolean',
        example: false,
      },
      body: {
        type: 'object',
        example: {},
      },
    },
    required: ['status', 'message', 'error', 'body'],
  },
});
