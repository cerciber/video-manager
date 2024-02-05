// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  UserSiginUp: {
    title: 'UserSiginUp',
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      rol: {
        type: 'string',
      },
      userId: {
        type: 'number',
      },
      authUserId: {
        type: 'number',
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
      userId: 41,
      authUserId: 55,
      name: 'Cesar',
      email: 'cesar@gmail.com',
      cellphone: '+573124563456',
    },
    required: [
      'username',
      'rol',
      'userId',
      'authUserId',
      'name',
      'email',
      'cellphone',
    ],
  },
});
