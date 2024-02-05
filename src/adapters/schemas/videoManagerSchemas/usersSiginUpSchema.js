// Imports
const _ = require('lodash');
const {
  getSchemaExampleFromExamples,
} = require('@src/adapters/controllers/schemas/schemaController');
const userSiginUpSchema = require('./userSiginUpSchema');

// Extract example
const exampleItem = getSchemaExampleFromExamples(userSiginUpSchema);

// Exports
module.exports = _.cloneDeep({
  UsersSiginUp: {
    title: 'UsersSiginUp',
    type: 'array',
    items: userSiginUpSchema.UserSiginUp,
    example: [exampleItem, exampleItem, exampleItem],
  },
});
