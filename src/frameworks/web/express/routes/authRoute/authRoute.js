// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  signinUserAuthController,
  signupUserAuthController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/auth/authUserController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${authSignIn}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate user on system.
 *     description: Validate user Authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuthNoId'
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/Token'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post(paths.authSignIn.path, async (req, res) => {
  return sendResponse(req, res, await signinUserAuthController(req.body));
});

/**
 * @swagger
 * ${authSignUp}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register an user authentication
 *     description: Register an user authentication with the provided data as 'common'.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSiginUpNoId'
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                        $ref: '#/components/schemas/UserSiginUp'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       409:
 *         allOf:
 *           - $ref: '#/components/responses/409'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.post(paths.authSignUp.path, async (req, res) => {
  return sendResponse(req, res, await signupUserAuthController(req.body));
});

// Exports
module.exports = router;
