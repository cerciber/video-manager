// Imports
const _ = require('lodash');
const successSchema = require('../successSchema');
const httpResponseSchema = require('../httpResponseSchema');

// Customizations
const { properties } = successSchema.Success;
properties.status.example = 200;
properties.message.example = 'Successful operation.';
httpResponseSchema.description = properties.message.example;
httpResponseSchema.content['application/json'].schema = successSchema.Success;

// Exports
module.exports = _.cloneDeep({
  [properties.status.example]: httpResponseSchema,
});
