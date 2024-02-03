// Get key of an object by value
function getKeyByValue(object, value) {
  const keyString = Object.keys(object).find((key) => object[key] === value);
  return keyString || null;
}

module.exports = {
  getKeyByValue,
};
