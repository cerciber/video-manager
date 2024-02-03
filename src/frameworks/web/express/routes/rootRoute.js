// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const gitHubApiRoute = require('./gitHubApiRoute/gitHubApiRoute');

// Include subpaths
router.router.use(paths.root.path, gitHubApiRoute.router);

// Exports
module.exports = router;
