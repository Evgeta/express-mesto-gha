
const { DEFAULT_ERROR_CODE } = require('../errors/errors')

class DefaultError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = DEFAULT_ERROR_CODE;
    }
  }
  
  module.exports = DefaultError;
  