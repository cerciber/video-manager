// Imports
const _ = require('lodash');
const errorSchema = require('../errorSchema');
const httpResponseSchema = require('../httpResponseSchema');

// Customizations
const { properties } = errorSchema.Error;
properties.status.example = 400;
properties.message.example = 'Bad request.';
httpResponseSchema.description = properties.message.example;
httpResponseSchema.content['application/json'].schema = errorSchema.Error;

// Exports
module.exports = _.cloneDeep({
  [properties.status.example]: httpResponseSchema,
});
