// Imports
const Validator = require('swagger-model-validator');
const _ = require('lodash');
const getSwaggerData = require('@src/frameworks/UI/swagger/getSwaggerData');

// Instance swagger validator
const swaggerData = getSwaggerData();
const validator = new Validator(swaggerData);

// Validate empty object
function validateEmptyObject(value) {
  try {
    if (!(typeof value === 'object' && Object.keys(value).length === 0)) {
      throw new Error(
        `Expected a empty object, but received a ${JSON.stringify(value)}`
      );
    }
    return {
      valid: true,
      errors: [],
      expected: {},
      obtained: JSON.stringify(value),
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: {},
      obtained: JSON.stringify(value),
    };
  }
}

// Validate swwagger schema
function validateSchema(name, schema) {
  const result = validator.validate(
    schema,
    swaggerData.components.schemas[name],
    true,
    false,
    true
  );
  return {
    valid: result.valid,
    errors:
      result.errors?.map((error) => ({
        message: error.message,
        stack: error.stack,
      })) || [],
    expected: swaggerData.components.schemas[name],
    obtained: schema,
  };
}

// Validate response swwagger schema
function validateResponse(code, schema, body) {
  if (!swaggerData.components.responses[code]) {
    throw new Error(`Response schema ${code} no exist`);
  }

  const responseSchema = _.cloneDeep(
    swaggerData.components.responses[code].content['application/json'].schema
  );
  if (body) {
    Object.entries(body).forEach(([key, value]) => {
      if (!responseSchema.properties.body.properties) {
        responseSchema.properties.body.properties = {};
      }
      responseSchema.properties.body.properties[key] =
        swaggerData.components.schemas[value];
    });

    if (Object.keys(body).length === 0) {
      const emptyValidationResult = validateEmptyObject(schema.body);
      if (!emptyValidationResult.valid) {
        return emptyValidationResult;
      }
    }
  }

  const result = validator.validate(schema, responseSchema, true, false, true);
  try {
    if (result.valid && schema.status !== code) {
      throw new Error(
        `Expected a status value of ${code}, but received a status value of ${schema.status}`
      );
    }
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: responseSchema,
      obtained: schema,
    };
  }

  return {
    valid: result.valid,
    errors:
      result.errors?.map((error) => {
        return {
          message: error.message,
          stack: error.stack,
        };
      }) || [],
    expected: responseSchema,
    obtained: schema,
  };
}

// Validate primitive data type
function validateType(type, value) {
  try {
    if (String(typeof value) !== type) {
      throw new Error(
        `Expected a value of type ${type}, but received a value of type ${typeof value}`
      );
    }
    return {
      valid: true,
      errors: [],
      expected: type,
      obtained: `${String(typeof value)} (${value})`,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: type,
      obtained: `${String(typeof value)} (${value})`,
    };
  }
}

// Validate no empty string
function validateNonEmptyString(value) {
  try {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Expected a non-empty string, but received ${JSON.stringify(value)}`
      );
    }
    return {
      valid: true,
      errors: [],
      expected: 'Non empty string',
      obtained: JSON.stringify(value),
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: 'Non empty string',
      obtained: JSON.stringify(value),
    };
  }
}

function validateNonArrayObject(value) {
  try {
    if (
      !(typeof value === 'object' && value !== null && !Array.isArray(value))
    ) {
      throw new Error(
        `Expected an keys object, but received a ${JSON.stringify(value)}`
      );
    }
    return {
      valid: true,
      errors: [],
      expected: 'A keys object',
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: 'A keys object',
      obtained: value,
    };
  }
}

// Validate object with specific keys
function validateObjectKeys(value, expectedKeys) {
  try {
    if (
      !(typeof value === 'object' && value !== null && !Array.isArray(value))
    ) {
      throw new Error(
        `Expected an key object, but received a ${JSON.stringify(value)}`
      );
    }

    const receivedKeys = Object.keys(value);
    const missingKeys = expectedKeys.filter(
      (key) => !receivedKeys.includes(key)
    );
    const extraKeys = receivedKeys.filter((key) => !expectedKeys.includes(key));

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      throw new Error(
        `Expected object keys: ${expectedKeys.join(
          ', '
        )}. Received keys: ${receivedKeys.join(', ')}`
      );
    }

    return {
      valid: true,
      errors: [],
      expected: `An object with keys: ${expectedKeys.join(', ')}`,
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: `An object with keys: ${expectedKeys.join(', ')}`,
      obtained: value,
    };
  }
}

// Validate regular expression
function validateRegex(regexPattern, value) {
  try {
    if (!(regexPattern instanceof RegExp)) {
      throw new Error('Expected a regular expression pattern');
    }

    if (!regexPattern.test(value)) {
      throw new Error(`Value "${value}" does not match the expected pattern`);
    }

    return {
      valid: true,
      errors: [],
      expected: regexPattern.source,
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: regexPattern.source,
      obtained: value,
    };
  }
}

// Validate positive integer string
function validatePositiveIntegerString(value) {
  try {
    const integerValue = Number(value);

    if (
      Number.isNaN(integerValue) ||
      integerValue < 0 ||
      !Number.isInteger(integerValue)
    ) {
      throw new Error(
        `Expected a positive integer string, but received ${typeof value}`
      );
    }

    return {
      valid: true,
      errors: [],
      expected: 'Positive integer string',
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: 'Positive integer string',
      obtained: value,
    };
  }
}

// Validate string in options
function validateStringInOptions(value, options) {
  try {
    if (!options.includes(value)) {
      throw new Error(
        `Expected one of the following options: ${options.join(', ')}, but received '${value}'`
      );
    }

    return {
      valid: true,
      errors: [],
      expected: `One of: ${options.join(', ')}`,
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: `One of: ${options.join(', ')}`,
      obtained: value,
    };
  }
}

// Validate string in options
function validateStringOrUndefinedInOptions(value, options) {
  try {
    if (!options.includes(value) && value !== undefined) {
      throw new Error(
        `Expected one of the following options: ${options.join(', ')} or undefined, but received '${value}'`
      );
    }

    return {
      valid: true,
      errors: [],
      expected: `One of: ${options.join(', ')} or undefined`,
      obtained: value,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: `One of: ${options.join(', ')}`,
      obtained: value,
    };
  }
}

function validateObjectWithMinKeys(obj, minKeys) {
  try {
    const keys = Object.keys(obj);

    if (keys.length < minKeys) {
      throw new Error(
        `Expected object to have at least ${minKeys} key(s), but received ${keys.length}`
      );
    }

    return {
      valid: true,
      errors: [],
      expected: `Object with at least ${minKeys} key(s)`,
      obtained: keys,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
      expected: `Object with at least ${minKeys} key(s)`,
      obtained: {},
    };
  }
}

// Exports
module.exports = {
  validateSchema,
  validateResponse,
  validateType,
  validateEmptyObject,
  validateNonEmptyString,
  validateNonArrayObject,
  validateObjectKeys,
  validateRegex,
  validatePositiveIntegerString,
  validateStringInOptions,
  validateStringOrUndefinedInOptions,
  validateObjectWithMinKeys,
};
