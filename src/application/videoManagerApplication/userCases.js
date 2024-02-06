// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');
const AuthUser = require('@src/entities/videoManagerEntities/AuthUser');

// Define table users
const AUTH_TABLE = 'authUsers';
const TABLE = 'users';
const ROLS_TABLE = 'rols';

// List data
async function getUserslistCase() {
  // Get gateway data
  const gatewayUsers = await gateway.loadMany(AUTH_TABLE, {
    include: {
      rol: true,
      user: true,
    },
  });

  // Format data to schema
  const usersSchema = gatewayUsers.map((user) => {
    return {
      username: user.username,
      rol: user.rol.key,
      ...user.user,
    };
  });

  // Return response
  return response.success(200, 'Users retrieved successfully.', usersSchema);
}

// Get by id
async function getUserByIdCase(userId) {
  // Get gateway data
  const gatewayUser = await gateway.loadMany(TABLE, {
    where: {
      userId,
    },
    include: {
      authUser: {
        include: {
          rol: true,
        },
      },
    },
  });

  // Check if user exist
  if (gatewayUser && gatewayUser.length > 0) {
    // Format data to schema
    const userAuthRecoverDataFromatted = {
      username: gatewayUser[0].authUser.username,
      rol: gatewayUser[0].authUser.rol.key,
      userId: gatewayUser[0].userId,
      authUserId: gatewayUser[0].authUserId,
      name: gatewayUser[0].name,
      email: gatewayUser[0].email,
      cellphone: gatewayUser[0].cellphone,
    };

    // Return response
    return response.success(
      200,
      'User retrieved successfully.',
      userAuthRecoverDataFromatted
    );
  }

  // Return response
  return response.success(404, 'User not exist.', {});
}

// Add
async function addUserCase(username, rol, password, name, email, cellphone) {
  // Add gateway data
  const authUser = new AuthUser(undefined, username, password, false);
  const gatewayUserAuthAddedResponse = await gateway.saveOne(AUTH_TABLE, {
    data: {
      username: authUser.username,
      password: authUser.getPassword(),
      rol: {
        connect: {
          key: rol,
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

  // User added
  if (gatewayUserAuthAddedResponse.status === 201) {
    // Recover data
    const userAuthRecoverData = await gateway.loadOne(AUTH_TABLE, {
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
    return response.success(
      201,
      'User registered successfully.',
      userAuthRecoverDataFromatted
    );
  }

  // Return response
  return gatewayUserAuthAddedResponse;
}

// Update by id
async function updateUserCase(
  userId,
  username,
  rol,
  password,
  name,
  email,
  cellphone
) {
  // Get new rol id
  let newRol;
  if (rol) {
    newRol = await gateway.loadOne(ROLS_TABLE, {
      where: {
        key: rol,
      },
    });
  }

  // Update gateway data
  const updatedUser = await gateway.update(TABLE, {
    where: {
      userId,
    },
    data: {
      name,
      email,
      cellphone,
      authUser: {
        update: {
          username,
          password: password
            ? new AuthUser(undefined, '', password, false).getPassword()
            : undefined,
          rolId: newRol?.rolId,
        },
      },
    },
  });

  // If updated
  if (updatedUser.status === 200) {
    // Recover data
    const userAuthRecoverData = await gateway.loadOne(AUTH_TABLE, {
      where: {
        authUserId: updatedUser.body.authUserId,
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
    return response.success(
      200,
      'User updated successfully.',
      userAuthRecoverDataFromatted
    );
  }

  // Return response
  return updatedUser;
}

// Remove by id
async function removeUserCase(userId) {
  // Get authUserId
  const user = await gateway.loadOne(TABLE, {
    where: {
      userId,
    },
  });

  // Check if user exist
  if (!user) {
    // Return response
    return response.success(404, 'User not exist.', {});
  }

  // Delete gateway data
  await gateway.remove(AUTH_TABLE, {
    where: {
      authUserId: user.authUserId,
    },
  });

  // Return response
  return response.success(200, 'User deleted successfully.', {});
}

// Exports
module.exports = {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
};
