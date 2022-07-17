const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUserProfile, updateAvatar } = require('../controllers/users');


// Получение всех всех пользователей
router.get('/', getUsers);

// Получение пользователя по _id
router.get('/:userId', getUserById);

//Создание пользователя
router.post('/', createUser);

//обновление профиля пользователя
router.patch('/me', updateUserProfile);
  
//обновление аватара
router.patch('/me/avatar', updateAvatar);

module.exports = router;