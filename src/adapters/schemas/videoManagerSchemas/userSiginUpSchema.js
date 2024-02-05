// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserSiginUp: {
    title: 'UserSiginUp',
    type: 'object',
    properties: {
      userId: {
        type: 'number',
      },
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
    required: ['userId', 'username', 'password', 'name', 'email', 'cellphone'],
  },
});
