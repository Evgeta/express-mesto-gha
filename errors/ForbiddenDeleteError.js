const { FORBIDDEN_DELETE_ERROR_CODE } = require('./errors');

class ForbiddenDeleteError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenDeleteError';
    this.statusCode = FORBIDDEN_DELETE_ERROR_CODE;
    this.message = 'Нельзя удалить объект, созданный другим пользователем';
  }
}

module.exports = ForbiddenDeleteError;
