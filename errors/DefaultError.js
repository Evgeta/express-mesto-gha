const { DEFAULT_ERROR_CODE } = require('./errors');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DefaultError';
    this.statusCode = DEFAULT_ERROR_CODE;
    this.message = 'Ошибка сервера';
  }
}

module.exports = DefaultError;
