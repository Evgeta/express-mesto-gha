const router = require('express').Router();
const {
  getUsers,
  getUserById,
  // createUser,
  updateUserProfile,
  updateAvatar,
  getUsersMe,
} = require('../controllers/users');

// Получение всех всех пользователей
router.get('/', getUsers);

// Получение пользователя по _id
router.get('/:userId', getUserById);

// Получение информации о своем профиле
router.get('/users/me', getUsersMe);

// Создание пользователя
// router.post('/', createUser);

// обновление профиля пользователя
router.patch('/me', updateUserProfile);

// обновление аватара
router.patch('/me/avatar', updateAvatar);

module.exports = router;
