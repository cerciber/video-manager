// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  addCommentController,
  removeCommentController,
  removeMyCommentController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/comment/commentController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${comments}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add comment
 *     description: Creates a new comment with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentNoId'
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
 *                       $ref: '#/components/schemas/Comment'
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
router.post(paths.comments.path, async (req, res) => {
  return sendResponse(req, res, await addCommentController(req.body));
});

/**
 * @swagger
 * ${comments}/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete comment by ID
 *     description: Deletes an existing comment based on ID.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment.
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
router.delete(`${paths.comments.path}/:commentId`, async (req, res) => {
  return sendResponse(req, res, await removeCommentController(req.params));
});

/**
 * @swagger
 * ${ownComments}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add own comment
 *     description: Creates own new comment with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentNoIdNoUser'
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
 *                       $ref: '#/components/schemas/Comment'
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
router.post(paths.ownComments.path, async (req, res) => {
  return sendResponse(
    req,
    res,
    await addCommentController({
      ...req.body,
      userId: req.tokenPayload.userId,
    })
  );
});

/**
 * @swagger
 * ${ownComments}/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete my comment by ID
 *     description: Deletes my existing comment based on ID.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment.
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
router.delete(`${paths.ownComments.path}/:commentId`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await removeMyCommentController({
      ...req.params,
      userId: String(req.tokenPayload.userId),
    })
  );
});

// Exports
module.exports = router;
