const { USER_EXISTS_ERROR_CODE } = require('./errors');

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
    this.statusCode = USER_EXISTS_ERROR_CODE;
    this.message = 'Пользователь с таким email уже зарегистрирован';
  }
}

module.exports = UserExistsError;
