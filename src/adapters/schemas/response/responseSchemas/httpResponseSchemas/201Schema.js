// Imports
const _ = require('lodash');
const successSchema = require('../successSchema');
const httpResponseSchema = require('../httpResponseSchema');

// Customizations
const { properties } = successSchema.Success;
properties.status.example = 201;
properties.message.example = 'Successful operation with insertion.';
httpResponseSchema.description = properties.message.example;
httpResponseSchema.content['application/json'].schema = successSchema.Success;

// Exports
module.exports = _.cloneDeep({
  [properties.status.example]: httpResponseSchema,
});
