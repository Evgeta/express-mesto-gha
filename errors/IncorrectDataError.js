
const { INCORRECT_DATA_ERROR_CODE } = require('../errors/errors')

class IncorrectDataError extends Error {
    constructor(message) {
      super(message);
      this.name = "IncorrectDataError";
      this.statusCode = INCORRECT_DATA_ERROR_CODE;
      this.message = "В запросе переданы некорректные данные";
    }
  }
  
  module.exports = IncorrectDataError;
  