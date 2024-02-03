// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserAuthNoId: {
    title: 'UserAuthNoId',
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    example: {
      username: 'cesar123',
      password: '7Y87YH8GG6Y8',
    },
    required: ['username', 'password'],
  },
});
