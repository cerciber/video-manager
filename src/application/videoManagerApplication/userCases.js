// Imports
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');
const response = require('@src/adapters/presenters/response');

// Define table users
const AUTH_TABLE = 'authUsers';
const TABLE = 'users';

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
  return response.success(200, 'Users retrieved successfully.', {
    users: usersSchema,
  });
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
  return response.success(404, 'User no exist.', {});
}

// Add
async function addUserCase(newData) {
  // Add gateway data
  const gatewayUserAdded = await gateway.add(TABLE, newData);

  // User added
  if (gatewayUserAdded.status === 201) {
    return response.success(201, 'User registered successfully.', {});
  }

  // User already exist
  if (gatewayUserAdded.status === 409) {
    return response.success(409, 'User already exist.', {});
  }

  // Return response
  return gatewayUserAdded;
}

// Update by id
async function updateUserCase(id, newData) {
  // Update gateway data
  const updatedUser = await gateway.update(TABLE, id, newData);

  // Check if user wasn't updated
  if (!updatedUser) {
    // Return response
    return response.success(404, 'User no exist.', {});
  }

  // Return response
  return response.success(200, 'User updated successfully.', {});
}

// Remove by id
async function removeUserCase(id) {
  // Delete gateway data
  const deletedUser = await gateway.remove(TABLE, id);

  // Check if user exist
  if (!deletedUser) {
    // Return response
    return response.success(404, 'User no exist.', {});
  }

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
