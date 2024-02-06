// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  addLikeController,
  removeLikeController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/like/likeController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${likes}:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Add like
 *     description: Creates a new like with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeNoId'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         allOf:
 *           - $ref: '#/components/responses/201'
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
router.post(paths.likes.path, async (req, res) => {
  return sendResponse(req, res, await addLikeController(req.body));
});

/**
 * @swagger
 * ${likes}/{userId}/{videoId}:
 *   delete:
 *     tags:
 *       - Likes
 *     summary: Delete like by user ID and video ID
 *     description: Deletes an existing like based on the provided user ID and video ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video.
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
router.delete(`${paths.likes.path}/:userId/:videoId`, async (req, res) => {
  return sendResponse(req, res, await removeLikeController(req.params));
});

// Exports
module.exports = router;
