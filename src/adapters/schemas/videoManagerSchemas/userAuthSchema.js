// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserAuth: {
    title: 'UserAuth',
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    example: {
      id: '1',
      username: 'cesar123',
      password: '7Y87YH8GG6Y8',
    },
    required: ['id', 'username', 'password'],
  },
});
