// Imports
const _ = require('lodash');
const responseSchema = require('../responseSchema');

// Customizations
const { properties } = responseSchema.Response;
properties.status.example = 200;
properties.message.example = 'Successful operation.';
properties.error.example = false;

// Exports
module.exports = _.cloneDeep({
  Success: responseSchema.Response,
});
