// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getVideoslistController,
  getVideoByIdController,
  addVideoController,
  updateVideoController,
} = require('@src/adapters/controllers/apisController/videoManagerControllers/video/videoController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${videos}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get all videos
 *     description: Returns a list of all videos.
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
 *                       $ref: '#/components/schemas/Videos'
 *       401:
 *         allOf:
 *           - $ref: '#/components/responses/401'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(paths.videos.path, async (req, res) => {
  return sendResponse(req, res, await getVideoslistController());
});

/**
 * @swagger
 * ${videos}/{videoId}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get video by ID
 *     description: Retrieves a video based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video to retrieve.
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
 *                       $ref: '#/components/schemas/Video'
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
router.get(`${paths.videos.path}/:videoId`, async (req, res) => {
  return sendResponse(req, res, await getVideoByIdController(req.params));
});

/**
 * @swagger
 * ${videos}:
 *   post:
 *     tags:
 *       - Videos
 *     summary: Add video
 *     description: Creates a new video with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoNoId'
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
 *                       $ref: '#/components/schemas/Video'
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
router.post(paths.videos.path, async (req, res) => {
  return sendResponse(req, res, await addVideoController(req.body));
});

/**
 * @swagger
 * ${videos}/{videoId}:
 *   patch:
 *     tags:
 *       - Videos
 *     summary: Update video by video Id
 *     description: Update an existing video with the provided data.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoNoIdOptional'
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
 *                       $ref: '#/components/schemas/Video'
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
router.patch(`${paths.videos.path}/:videoId`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateVideoController(req.params, req.body)
  );
});

// Exports
module.exports = router;
