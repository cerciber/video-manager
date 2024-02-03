// Define paths container
const paths = {};

// Define paths
paths.root = { path: '', public: false };

// Define docs
paths.apiDocs = { path: `${paths.root.path}/api-docs`, public: true };

// Define API's
paths.api = { path: `${paths.root.path}/api`, public: false };

// Define API paths
paths.gitHubApiConsumer = { path: `${paths.api.path}/consumer`, public: false };
paths.gitHubApiConsumerGetTop10GoogleRespositories = {
  path: `${paths.gitHubApiConsumer.path}/get-top-10-google-respositories`,
  public: true,
};

// Exports
module.exports = paths;
