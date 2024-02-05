// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserAdminSiginUpNoIdOptional: {
    title: 'UserAdminSiginUpNoIdOptional',
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      rol: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      cellphone: {
        type: 'string',
      },
    },
    example: {
      username: 'cesar123',
      rol: 'common',
      password: '7Y87YH8GG6Y8',
      name: 'Cesar',
      email: 'cesar@gmail.com',
      cellphone: '+573124563456',
    },
    required: [],
  },
});
