// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const authRoute = require('./authRoute/authRoute');

// Include subpaths
router.router.use(paths.root.path, authRoute.router);

// Exports
module.exports = router;
