// Imports
const response = require('@src/adapters/presenters/response');
const {
  addCommentCase,
  removeCommentCase,
} = require('@src/application/videoManagerApplication/commentCases');
const {
  validate,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validatePositiveIntegerString,
  validateSchema,
} = require('@src/adapters/controllers/validation/validationFunctions');

// Add
async function addCommentController(body) {
  // Get input
  const comment = body;

  // Validate input
  const inputValidation = validate([
    [
      validateSchema,
      ['CommentNoId', comment],
      'Comment schema not have correct structure.',
    ],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      400,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const addCommentResponse = await addCommentCase(
    comment.userId,
    comment.videoId,
    comment.comment
  );

  // Return output
  return addCommentResponse;
}

// Remove by id
async function removeCommentController(params) {
  // Get input
  const { commentId } = params;

  // Validate input
  const inputValidation = validate([
    [
      validatePositiveIntegerString,
      [commentId],
      'Param commentId not is an positive integer string type.',
    ],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      400,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const deleteCommentResponse = await removeCommentCase(Number(commentId));

  // Return correct validation output
  return deleteCommentResponse;
}

// Exports
module.exports = {
  addCommentController,
  removeCommentController,
};
