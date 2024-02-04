// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/videoManagerEntities/Auth');
const AuthUser = require('@src/entities/videoManagerEntities/AuthUser');

// Define table users auth
const TABLE = 'authUsers';

// Get by id
async function signinUserAuthCase(username, password) {
  // Get gateway data
  const gatewayUserAuth = await gateway.loadAll(TABLE, {
    where: { username },
  });

  // Check if username is incorrect
  if (!gatewayUserAuth || gatewayUserAuth.length === 0) {
    // Return response
    return response.error(404, 'User Auth incorrect.', {});
  }

  // Instance AuthUser entity
  const authUser = new AuthUser(
    undefined,
    gatewayUserAuth[0].username,
    gatewayUserAuth[0].password,
    true
  );

  // Check if password is incorrect
  if (!(await authUser.comparePassword(password))) {
    // Return response
    return response.error(404, 'User Auth incorrect.', {});
  }

  // Generate token
  const tokenSchema = new Auth().generateToken({ id: gatewayUserAuth[0].id });

  // Return response
  return response.success(200, 'User Auth retrieved successfully.', {
    token: tokenSchema,
  });
}

// Add
async function signupUserAuthCase(username, password, name, email, cellphone) {
  // Instance AuthUser entity
  const authUser = new AuthUser(undefined, username, password, false);

  // Add gateway data
  const gatewayUserAuthAdded = await gateway.saveOne(TABLE, {
    username: authUser.username,
    password: authUser.getPassword(),
    rol: {
      connect: {
        key: 'common',
      },
    },
    user: {
      create: {
        name,
        email,
        cellphone,
      },
    },
  });

  return response.success(
    gatewayUserAuthAdded.status,
    gatewayUserAuthAdded.message,
    {}
  );
}

// Exports
module.exports = {
  signinUserAuthCase,
  signupUserAuthCase,
};
