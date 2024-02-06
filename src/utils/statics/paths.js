// Define paths container
const paths = {};

// Define paths
paths.root = { path: '', public: false };

// Define docs
paths.apiDocs = { path: `${paths.root.path}/api-docs`, public: true };

// Define API's
paths.api = { path: `${paths.root.path}/api`, public: false };

// Define Auth paths
paths.auth = {
  path: `${paths.api.path}/auth`,
  public: false,
};
paths.authSignIn = {
  path: `${paths.auth.path}/signin`,
  public: true,
};
paths.authSignUp = {
  path: `${paths.auth.path}/signup`,
  public: true,
};

// Define Users Paths
paths.users = {
  // Get all, get one, add, update and delete
  path: `${paths.api.path}/users`,
  public: false,
};
paths.ownUser = {
  // Get own, update own and delete own
  path: `${paths.api.path}/own/user`,
  public: false,
};

// Define Videos Paths
paths.videos = {
  // Get all, get one, add, update and delete
  path: `${paths.api.path}/videos`,
  public: false,
};
paths.ownVideos = {
  // Get all own, add own, update own and delete own
  path: `${paths.api.path}/own/videos`,
  public: false,
};
paths.topVideos = {
  path: `${paths.api.path}/top-rated-videos`,
  public: false,
};
paths.privateVideos = {
  path: `${paths.api.path}/private-videos`,
  public: false,
};
paths.publicVideos = {
  path: `${paths.api.path}/public-videos`,
  public: true,
};

// Define Likes Paths
paths.likes = {
  // Get all, get one, add and delete
  path: `${paths.api.path}/likes`,
  public: false,
};
paths.ownLikes = {
  // Get all own, add own and delete own
  path: `${paths.api.path}/own/likes`,
  public: false,
};

// Define Comments Paths
paths.comments = {
  // Get all, get one, add and delete
  path: `${paths.api.path}/comments`,
  public: false,
};
paths.ownComments = {
  // Get all own, add own and delete own
  path: `${paths.api.path}/own/comments`,
  public: false,
};

// Exports
module.exports = paths;
