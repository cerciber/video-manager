// Imports
const database = require('@src/frameworks/DB/database/database');
const response = require('@src/adapters/presenters/response');

async function loadAll(tableName, parameters) {
  // Find all data
  const randomRegister = await database[tableName].findMany(parameters);
  return randomRegister;
}

async function saveOne(tableName, register) {
  try {
    // Save data
    const savedRegister = await database[tableName].create({
      data: register,
    });
    return response.success(201, 'User registered successfully.', {
      savedRegister,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return response.success(
        409,
        `The field '${error.meta.target[0]}' already exist.`,
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
  saveOne,
  update,
  startTransaction,
};
