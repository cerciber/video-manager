// Imports
const _ = require('lodash');
const {
  getSchemaExampleFromExamples,
} = require('@src/adapters/controllers/schemas/schemaController');
const gitHubApiRepositorySchema = require('./gitHubApiRepositorySchema');

// Extract example
const exampleItem = getSchemaExampleFromExamples(gitHubApiRepositorySchema);

// Exports
module.exports = _.cloneDeep({
  GitHubApiRepositories: {
    title: 'gitHubApiRepositories',
    type: 'array',
    items: gitHubApiRepositorySchema.GitHubApiRepository,
    example: [exampleItem, exampleItem, exampleItem],
  },
});
