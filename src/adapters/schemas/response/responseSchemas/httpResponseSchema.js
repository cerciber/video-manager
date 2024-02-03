// Imports
const _ = require('lodash');
const responseSchema = require('../responseSchema');

// Exports
module.exports = _.cloneDeep({
  description: 'Description.',
  content: {
    'application/json': {
      schema: responseSchema.Response,
    },
  },
});
