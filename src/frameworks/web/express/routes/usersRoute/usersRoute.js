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
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
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
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
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
 *             $ref: '#/components/schemas/UserAdminSiginUpNoId'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/UserSiginUp'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
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
 * ${users}/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user by user Id
 *     description: Update an existing user with the provided data.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAdminSiginUpNoIdOptional'
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
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       409:
 *         allOf:
 *           - $ref: '#/components/responses/409'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.patch(`${paths.users.path}/:userId`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateUserController(req.params, req.body)
  );
});

/**
 * @swagger
 * ${users}/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     description: Deletes an existing user based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.delete(`${paths.users.path}/:userId`, async (req, res) => {
  return sendResponse(req, res, await removeUserController(req.params));
});

/**
 * @swagger
 * ${ownUser}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get my user
 *     description: Retrieves my own user based on auth data.
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
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(`${paths.ownUser.path}`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await getUserByIdController({ userId: String(req.tokenPayload.userId) })
  );
});

/**
 * @swagger
 * ${ownUser}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update my user
 *     description: Update my user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAdminSiginUpNoIdOptional'
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
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       409:
 *         allOf:
 *           - $ref: '#/components/responses/409'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.patch(`${paths.ownUser.path}`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateUserController(
      { userId: String(req.tokenPayload.userId) },
      req.body
    )
  );
});

/**
 * @swagger
 * ${ownUser}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete my user
 *     description: Delete my user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *       400:
 *         allOf:
 *           - $ref: '#/components/responses/400'
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       404:
 *         allOf:
 *           - $ref: '#/components/responses/404'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.delete(`${paths.ownUser.path}`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await removeUserController({ userId: String(req.tokenPayload.userId) })
  );
});

// Exports
module.exports = router;
