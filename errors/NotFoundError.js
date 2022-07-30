const { NOT_FOUND_ERROR_CODE } = require('./errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_ERROR_CODE;
    this.message = 'Запрашиваемый объект не найден';
  }
}

module.exports = NotFoundError;
