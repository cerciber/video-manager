// Convert string value to type
function convertToType(value, targetType) {
  if (targetType === 'string') {
    return String(value);
  }
  if (targetType === 'number') {
    return Number(value);
  }
  if (targetType === 'boolean') {
    return Boolean(value);
  }
  if (targetType === 'object') {
    return Object(value);
  }
  if (targetType === 'array') {
    return Array(value);
  }
  throw new Error(`Tipo no compatible: ${targetType}`);
}

module.exports = {
  convertToType,
};
