const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatar,
  getUsersMe,
} = require('../controllers/users');
const { linkRegEx } = require('../utils/regulars');

// Получение всех всех пользователей
router.get('/', getUsers);

// Получение пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

// Получение информации о своем профиле
router.get('/users/me', getUsersMe);

// обновление профиля пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

// обновление аватара
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkRegEx),
  }),
}), updateAvatar);

module.exports = router;
