// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserSiginUpNoId: {
    title: 'UserSiginUpNoId',
    type: 'object',
    properties: {
      username: {
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
      password: '7Y87YH8GG6Y8',
      name: 'Cesar',
      email: 'cesar@gmail.com',
      cellphone: '+573124563456',
    },
    required: ['username', 'password', 'name', 'email', 'cellphone'],
  },
});
