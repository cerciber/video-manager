// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const authRoute = require('./authRoute/authRoute');
const usersRoute = require('./usersRoute/usersRoute');

// Include subpaths
router.router.use(paths.root.path, authRoute.router);
router.router.use(paths.root.path, usersRoute.router);

// Exports
module.exports = router;
