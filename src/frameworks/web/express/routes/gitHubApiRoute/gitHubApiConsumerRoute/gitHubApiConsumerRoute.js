// Imports
const sendResponse = require('@src/frameworks/web/express/sendResponse');
const {
  getTop10GoogleRespositoriesController,
} = require('@src/adapters/controllers/apisController/gitHubApiControllers/gitHubApiConsumerController/gitHubApiConsumerController');
const paths = require('@src/utils/statics/paths');
const router = require('@src/frameworks/web/express/router')();

/**
 * @swagger
 * ${gitHubApiConsumerGetTop10GoogleRespositories}:
 *   get:
 *     tags:
 *       - GitHubAPI
 *     summary: Top 10 Google Respositories
 *     description: get the top 10 most popular github repositories from the google account.
 *     responses:
 *       200:
 *         allOf:
 *           - $ref: '#/components/responses/200'
 *           - content:
 *               application/json:
 *                 schema:
 *                   properties:
 *                     body:
 *                       $ref: '#/components/schemas/GitHubApiRepositories'
 *       500:
 *         allOf:
 *           - $ref: '#/components/responses/500'
 */
router.get(
  paths.gitHubApiConsumerGetTop10GoogleRespositories.path,
  async (req, res) => {
    return sendResponse(
      req,
      res,
      await getTop10GoogleRespositoriesController()
    );
  }
);

// Exports
module.exports = router;
