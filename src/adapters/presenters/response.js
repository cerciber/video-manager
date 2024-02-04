exports.success = (status, message, body) => {
  return {
    status,
    message,
    error: false,
    body,
  };
};

exports.error = (status, message) => {
  return {
    status,
    message,
    error: true,
    body: {},
  };
};
