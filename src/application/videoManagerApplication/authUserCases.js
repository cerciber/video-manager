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
  const gatewayUserAuth = await gateway.loadMany(TABLE, {
    where: { username },
    include: {
      user: true,
    },
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

  // Generate token payload
  const tokenPayload = {
    authUserId: gatewayUserAuth[0].authUserId,
    userId: gatewayUserAuth[0].user.userId,
  };

  // Generate token
  const tokenSchema = new Auth().generateToken(tokenPayload);

  // Return response
  return response.success(200, 'User Auth retrieved successfully.', {
    token: tokenSchema,
  });
}

// Add
async function signupUserAuthCase(username, password, name, email, cellphone) {
  // Instance AuthUser entity
  const authUser = new AuthUser(undefined, username, password, false);

  // Add data
  const gatewayUserAuthAddedResponse = await gateway.saveOne(TABLE, {
    data: {
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
    },
  });

  // If added success
  if (gatewayUserAuthAddedResponse.status === 201) {
    // Recover data
    const userAuthRecoverData = await gateway.loadOne(TABLE, {
      where: {
        authUserId: gatewayUserAuthAddedResponse.body.authUserId,
      },
      include: {
        rol: true,
        user: true,
      },
    });

    // Format data
    const userAuthRecoverDataFromatted = {
      username: userAuthRecoverData.username,
      rol: userAuthRecoverData.rol.key,
      ...userAuthRecoverData.user,
    };

    // Return response
    return response.success(
      201,
      'User registered successfully.',
      userAuthRecoverDataFromatted
    );
  }

  // Return response
  return gatewayUserAuthAddedResponse;
}

// Exports
module.exports = {
  signinUserAuthCase,
  signupUserAuthCase,
};
