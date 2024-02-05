// Imports
const database = require('@src/frameworks/DB/database/database');
const response = require('@src/adapters/presenters/response');

async function loadAll(tableName, parameters) {
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
    return response.success(201, 'User registered successfully.', {
      savedRegister,
    });
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
  const registers = await transaction[tableName].update(parameters);
  return registers;
}

async function startTransaction(callback) {
  const transaction = await database.$transaction(async (tx) => {
    await callback(tx);
  });
  return transaction;
}

// Exports
module.exports = {
  loadAll,
  loadOne,
  saveOne,
  update,
  startTransaction,
};
