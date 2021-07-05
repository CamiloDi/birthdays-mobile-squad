
class ErrorHandler extends Error {
  constructor(internalCode, message, payload) {
    super();
    this.internalCode = internalCode;
    this.message = message;
    this.payload = payload;
  }
}

const handleError = (err, res) => {
  const { internalCode, message, payload } = err;
  const pl = payload ? payload : {};
  res.status(200)
    .json({
      internalCode,
      message,
      payload: pl,
    });
};

module.exports = {
  ErrorHandler,
  handleError,
};
