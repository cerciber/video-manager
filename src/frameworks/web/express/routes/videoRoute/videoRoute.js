// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getVideoslistController,
  getTopRatedVideoslistController,
  getVideosByUserIdController,
  getVideoByIdController,
  addVideoController,
  updateVideoController,
  removeVideoController,
  updateMyVideoController,
  removeMyVideoController,
  getPrivateVideoslistController,
  getPublicVideoslistController,
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

/**
 * @swagger
 * ${videos}/{videoId}:
 *   delete:
 *     tags:
 *       - Videos
 *     summary: Delete video by ID
 *     description: Deletes an existing video based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video to delete.
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
router.delete(`${paths.videos.path}/:videoId`, async (req, res) => {
  return sendResponse(req, res, await removeVideoController(req.params));
});

/**
 * @swagger
 * ${ownVideos}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get my videos
 *     description: Retrieves my videos based on the provided ID.
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
router.get(`${paths.ownVideos.path}`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await getVideosByUserIdController({
      userId: String(req.tokenPayload.userId),
    })
  );
});

/**
 * @swagger
 * ${ownVideos}:
 *   post:
 *     tags:
 *       - Videos
 *     summary: Add my video
 *     description: Creates my new video with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VideoNoIdNoUser'
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
router.post(paths.ownVideos.path, async (req, res) => {
  return sendResponse(
    req,
    res,
    await addVideoController({
      ...req.body,
      userId: req.tokenPayload.userId,
    })
  );
});

/**
 * @swagger
 * ${ownVideos}/{videoId}:
 *   patch:
 *     tags:
 *       - Videos
 *     summary: Update my video by video Id
 *     description: Update my existing video with the provided data.
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
 *             $ref: '#/components/schemas/VideoNoIdNoUserOptional'
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
router.patch(`${paths.ownVideos.path}/:videoId`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await updateMyVideoController(
      { ...req.params, userId: String(req.tokenPayload.userId) },
      req.body
    )
  );
});

/**
 * @swagger
 * ${ownVideos}/{videoId}:
 *   delete:
 *     tags:
 *       - Videos
 *     summary: Delete my video by ID
 *     description: Deletes my existing video based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video to delete.
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
router.delete(`${paths.ownVideos.path}/:videoId`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await removeMyVideoController({
      ...req.params,
      userId: String(req.tokenPayload.userId),
    })
  );
});

/**
 * @swagger
 * ${topVideos}/{numTop}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get top videos
 *     description: Returns a list of top videos with more likes.
 *     parameters:
 *       - in: path
 *         name: numTop
 *         required: true
 *         schema:
 *           type: string
 *         description: Number of videos to retrieve.
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
router.get(`${paths.topVideos.path}/:numTop`, async (req, res) => {
  return sendResponse(
    req,
    res,
    await getTopRatedVideoslistController(req.params)
  );
});

/**
 * @swagger
 * ${privateVideos}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get all private videos
 *     description: Returns a list of all private videos.
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
router.get(paths.privateVideos.path, async (req, res) => {
  return sendResponse(req, res, await getPrivateVideoslistController());
});

/**
 * @swagger
 * ${publicVideos}:
 *   get:
 *     tags:
 *       - Videos
 *     summary: Get all public videos
 *     description: Returns a list of all private videos.
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
router.get(paths.publicVideos.path, async (req, res) => {
  return sendResponse(req, res, await getPublicVideoslistController());
});

// Exports
module.exports = router;
