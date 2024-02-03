// Imports
const database = require('@src/frameworks/DB/database/database');

async function loadAll(tableName, parameters) {
  // Find all data
  const randomRegister = await database[tableName].findMany(parameters);
  return randomRegister;
}

async function saveOne(tableName, register) {
  // Save data
  const savedRegister = await database[tableName].create({
    data: register,
  });
  return savedRegister;
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
