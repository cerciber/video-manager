// Imports
const response = require('@src/adapters/presenters/response');
const {
  startPrepareDishCase,
  getOrderListCase,
  prepareDishCase,
  finishOrderCase,
  getRecipesListCase,
} = require('@src/application/kitchenApplication/kitchenApplicationCases');
const {
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateResponse,
} = require('@src/adapters/controllers/validation/validationFunctions');
const kafkaService = require('@src/frameworks/external/kafkaService/kafkaService');
const dbGateway = require('@src/adapters/gateways/dbGateway/dbGateway');

async function startPrepareDishController() {
  // Apply bussiness logic
  const startPrepareDishResponse = await startPrepareDishCase(kafkaService);

  // Validate output
  const outputValidation = validateByStatus(startPrepareDishResponse.status, {
    201: [
      [
        validateResponse,
        [201, startPrepareDishResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return startPrepareDishResponse;
}

async function getOrderListController() {
  // Apply bussiness logic
  const getOrderListResponse = await getOrderListCase(dbGateway);

  // Return correct validation output
  return getOrderListResponse;
}

async function getRecipesListController() {
  // Apply bussiness logic
  const getOrderListResponse = await getRecipesListCase(dbGateway);

  // Return correct validation output
  return getOrderListResponse;
}

async function prepareDishController() {
  // Apply bussiness logic
  await prepareDishCase(dbGateway, kafkaService);
}

async function finishOrderController(orderId) {
  // Apply bussiness logic
  await finishOrderCase(dbGateway, orderId);
}

// Exports
module.exports = {
  startPrepareDishController,
  getOrderListController,
  prepareDishController,
  finishOrderController,
  getRecipesListController,
};
