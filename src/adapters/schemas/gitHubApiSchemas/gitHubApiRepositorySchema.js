// Imports
const _ = require('lodash');

// Exports
module.exports = _.cloneDeep({
  GitHubApiRepository: {
    title: 'gitHubApiRepository',
    type: 'object',
    properties: {
      number: {
        type: 'number',
      },
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      stars: {
        type: 'number',
      },
      forks: {
        type: 'number',
      },
    },
    example: {
      number: 1,
      id: 345345454,
      name: 'material-design-icons',
      description: 'Material Design icons by Google',
      stars: 345454,
      forks: 234,
    },
    required: ['number', 'id', 'name', 'description', 'stars', 'forks'],
  },
});
