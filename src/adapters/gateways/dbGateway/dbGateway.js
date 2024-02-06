// Imports
const database = require('@src/frameworks/DB/database/database');
const response = require('@src/adapters/presenters/response');

async function loadMany(tableName, parameters) {
  // Find all data
  const register = await database[tableName].findMany(parameters);
  return register;
}

async function loadOne(tableName, parameters) {
  // Find all data
  const register = await database[tableName].findUnique(parameters);
  return register;
}

async function saveOne(tableName, data) {
  try {
    // Save data
    const savedRegister = await database[tableName].create(data);

    // Return response
    return response.success(201, 'Data added successfully.', savedRegister);
  } catch (error) {
    if (error.code === 'P2002') {
      return response.error(
        409,
        `The field ${error.meta.target[0]} already exist.`,
        {}
      );
    }
    throw error;
  }
}

async function update(tableName, parameters, transaction = database) {
  try {
    // Update
    const register = await transaction[tableName].update(parameters);

    // Return response
    return response.success(200, 'Data updated successfully.', register);
  } catch (error) {
    if (error.code === 'P2002') {
      return response.error(
        409,
        `The field ${error.meta.target[0]} already exist.`,
        {}
      );
    }
    if (error.code === 'P2025') {
      return response.success(404, 'Data not exist.', {});
    }
    throw error;
  }
}

async function remove(tableName, parameters, transaction = database) {
  try {
    // Delete
    const register = await transaction[tableName].deleteMany(parameters);

    // Return response
    return response.success(200, 'Data deleted successfully.', register);
  } catch (error) {
    if (error.code === 'P2025') {
      return response.success(404, 'Data not exist.', {});
    }
    throw error;
  }
}

async function startTransaction(callback) {
  const transaction = await database.$transaction(async (tx) => {
    await callback(tx);
  });
  return transaction;
}

// Exports
module.exports = {
  loadMany,
  loadOne,
  saveOne,
  update,
  remove,
  startTransaction,
};
