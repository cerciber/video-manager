// Imports
const response = require('@src/adapters/presenters/response');
const config = require('@src/utils/statics/config');

async function startPrepareDishCase(eventService) {
  // Send new event
  await eventService.produceEvent(
    config.frameworks.kafka.kitchenTopic,
    'preparate-dish',
    {}
  );
  // Return response
  return response.success(
    201,
    'The preparation of the dish has been successfully started.',
    {}
  );
}

async function getOrderListCase(gateway) {
  const ordersList = await gateway.loadAll('orders', {
    select: {
      orderId: true,
      finished: true,
      createdAt: true,
      updatedAt: true,
      recipe: {
        select: {
          recipeId: true,
          name: true,
          recipeIngredients: {
            select: {
              recipeIngredientId: true,
              ingredientKey: true,
              amount: true,
            },
          },
        },
      },
    },
    orderBy: {
      orderId: 'desc',
    },
  });

  // Return response
  return response.success(
    200,
    'Orders list was loaded successfully.',
    ordersList
  );
}

async function getRecipesListCase(gateway) {
  const ordersList = await gateway.loadAll('recipes', {
    select: {
      recipeId: true,
      name: true,
      recipeIngredients: {
        select: {
          ingredientKey: true,
          amount: true,
        },
        orderBy: {
          ingredientKey: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Return response
  return response.success(
    200,
    'Recipes list was loaded successfully.',
    ordersList
  );
}

async function prepareDishCase(gateway, eventService) {
  // Load random recipe
  const recipe = await gateway.loadRandom('recipes', {
    select: {
      recipeId: true,
      recipeIngredients: {
        select: {
          ingredientKey: true,
          amount: true,
        },
      },
    },
  });

  // // Create New no finished order
  const newOrder = { recipeId: recipe.recipeId, finished: false };

  // // Save order on database
  const newOrderRegister = await gateway.saveOne('orders', newOrder);

  // // Format new order data
  const newOrderRegisterFormmated = {
    orderId: newOrderRegister.orderId,
    recipeIngredients: recipe.recipeIngredients.map((recipeIngredient) => ({
      ingredientKey: recipeIngredient.ingredientKey,
      amount: recipeIngredient.amount,
    })),
  };

  // Send new event
  await eventService.produceEvent(
    config.frameworks.kafka.storeTopic,
    'get-ingredients-from-store',
    newOrderRegisterFormmated
  );
}

async function finishOrderCase(gateway, orderId) {
  await gateway.update('orders', {
    where: {
      orderId,
    },
    data: {
      finished: true,
    },
  });
}

// Exports
module.exports = {
  startPrepareDishCase,
  getOrderListCase,
  prepareDishCase,
  finishOrderCase,
  getRecipesListCase,
};
