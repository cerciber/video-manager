// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  Token: {
    title: 'Token',
    type: 'object',
    properties: {
      token: {
        type: 'string',
      },
    },
    example: {
      token: '34FR34R34R34R',
    },
    required: ['token'],
  },
});
