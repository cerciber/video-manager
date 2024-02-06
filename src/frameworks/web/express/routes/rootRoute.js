// Imports
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();
const authRoute = require('./authRoute/authRoute');
const usersRoute = require('./usersRoute/usersRoute');
const videoRoute = require('./videoRoute/videoRoute');
const likesRoute = require('./likesRoute/likesRoute');

// Include subpaths
router.router.use(paths.root.path, authRoute.router);
router.router.use(paths.root.path, usersRoute.router);
router.router.use(paths.root.path, videoRoute.router);
router.router.use(paths.root.path, likesRoute.router);

// Exports
module.exports = router;
