// Imports
const { convertToType } = require('@src/utils/functions/convertStringToType');

// Extract Schema example from
function getSchemaExampleFromFileds(schema) {
  return Object.fromEntries(
    Object.entries(schema[Object.keys(schema)[0]].properties).map(
      ([key, value]) => [key, convertToType(value.example, value.type)]
    )
  );
}

function getSchemaExampleFromExamples(schema) {
  return Object.fromEntries(
    Object.entries(schema[Object.keys(schema)[0]].properties).map(
      ([key, value]) => [
        key,
        convertToType(schema[Object.keys(schema)[0]].example[key], value.type),
      ]
    )
  );
}

module.exports = {
  getSchemaExampleFromFileds,
  getSchemaExampleFromExamples,
};
