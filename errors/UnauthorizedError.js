const { UNAUTHORIZED_ERROR_CODE } = require('./errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
    this.message = 'В запросе переданы некорректные данные';
  }
}

module.exports = UnauthorizedError;
