// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/user/userController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${users}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Returns a list of all registered users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/UsersSiginUp'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(paths.users.path, async (req, res) => {
  return sendResponse(req, res, await getUserslistController());
});

/**
 * @swagger
 * ${users}/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieves a user based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/UserSiginUp'
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
router.get(`${paths.users.path}/:userId`, async (req, res) => {
  return sendResponse(req, res, await getUserByIdController(req.params));
});

/**
 * @swagger
 * ${users}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Add user
 *     description: Creates a new user with the provided data.
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
router.post(paths.users.path, async (req, res) => {
  return sendResponse(req, res, await addUserController(req.body));
});

/**
 * @swagger
 * ${users}/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user by ID
 *     description: Updates an existing user with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSiginUp'
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
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
router.put(`${paths.users.path}/:id`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateUserController(req.params, req.body)
  );
});

/**
 * @swagger
 * ${users}/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     description: Deletes an existing user based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
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
router.delete(`${paths.users.path}/:id`, async (req, res) => {
  return sendResponse(req, res, await removeUserController(req.params));
});

// Exports
module.exports = router;
