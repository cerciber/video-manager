// Validate with general validation structure
function validateOne(validationFunction, params) {
  const responseValidation = validationFunction(...params);
  return responseValidation;
}

// Validate general validation structure list
function validate(list) {
  let errors = [];
  let expected;
  let obtained;
  let message;
  let valid = true;
  for (let i = 0; i < list.length; i += 1) {
    const [validationFunction, params, badMessage] = list[i];
    const validation = validateOne(validationFunction, params);
    errors = errors.concat(validation.errors);
    if (!validation.valid) {
      valid = false;
      message = badMessage;
      expected = validation.expected;
      obtained = validation.obtained || typeof validation.obtained;
      break;
    }
  }
  return {
    valid,
    badMessage: `ValidateFormatError: ${message || errors[0]?.message || ''}`,
    details: { errors, comparison: { expected, obtained } },
  };
}

// Validate general validation structure list by status
function validateByStatus(status, validations) {
  if (Object.prototype.hasOwnProperty.call(validations, status)) {
    return validate(validations[status]);
  }
  throw new Error(`Response status code ${status} not found.`);
}

// Exports
module.exports = {
  validate,
  validateByStatus,
};
