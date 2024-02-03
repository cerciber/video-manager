// Convert string value to type
function convertToType(value, targetType) {
  if (targetType === 'string') {
    return String(value);
  }
  if (targetType === 'number') {
    return Number(value);
  }
  if (targetType === 'boolean') {
    return value.toLowerCase() === 'true';
  }
  throw new Error(`Tipo no compatible: ${targetType}`);
}

module.exports = {
  convertToType,
};
