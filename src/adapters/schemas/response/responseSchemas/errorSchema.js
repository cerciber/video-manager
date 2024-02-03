// Imports
const _ = require('lodash');
const responseSchema = require('../responseSchema');

// Customizations
const { properties } = responseSchema.Response;
properties.status.example = 500;
properties.message.example = 'An error occurred on the operation.';
properties.error.example = true;

// Exports
module.exports = _.cloneDeep({
  Error: responseSchema.Response,
});
