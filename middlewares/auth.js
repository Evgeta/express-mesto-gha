require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new UnauthorizedError('Для доступа к разделу необходима авторизация'));
  }
  req.user = payload;
  return next();
};
