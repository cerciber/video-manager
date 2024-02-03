// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const gitHubApiConsumerRoute = require('./gitHubApiConsumerRoute/gitHubApiConsumerRoute');

// Include subpaths
router.router.use(paths.root.path, gitHubApiConsumerRoute.router);

// Exports
module.exports = router;
