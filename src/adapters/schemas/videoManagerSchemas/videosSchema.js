// Imports
const _ = require('lodash');
const {
  getSchemaExampleFromExamples,
} = require('@src/adapters/controllers/schemas/schemaController');
const videoSchema = require('./videoSchema');

// Extract example
const exampleItem = getSchemaExampleFromExamples(videoSchema);

// Exports
module.exports = _.cloneDeep({
  Videos: {
    title: 'Videos',
    type: 'array',
    items: videoSchema.Video,
    example: [exampleItem, exampleItem, exampleItem],
  },
});
