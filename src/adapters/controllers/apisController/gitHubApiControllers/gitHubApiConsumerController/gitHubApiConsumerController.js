// Imports
const response = require('@src/adapters/presenters/response');
const {
  getTopOrganizationRespositoriesCase,
} = require('@src/application/gitHubApiApplication/gitHubApiCases');
const {
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateResponse,
} = require('@src/adapters/controllers/validation/validationFunctions');
const {
  octokitService,
} = require('@src/frameworks/external/octokit/octokitService');
const config = require('@src/utils/statics/config');

// List data
async function getTop10GoogleRespositoriesController() {
  // Apply bussiness logic
  const top10GoogleRespositoriesResponse =
    await getTopOrganizationRespositoriesCase(
      await octokitService(config.frameworks.octokit.gitHubApiKey),
      'google',
      10
    );

  // Validate output
  const outputValidation = validateByStatus(
    top10GoogleRespositoriesResponse.status,
    {
      200: [
        [
          validateResponse,
          [
            200,
            top10GoogleRespositoriesResponse,
            { repositories: 'GitHubApiRepositories' },
          ],
          `Response not have correct structure.`,
        ],
      ],
      500: [
        [
          validateResponse,
          [500, top10GoogleRespositoriesResponse, {}],
          "Can't get github repositories information.",
        ],
      ],
    }
  );

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return top10GoogleRespositoriesResponse;
}

// Exports
module.exports = {
  getTop10GoogleRespositoriesController,
};
