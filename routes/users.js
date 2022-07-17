const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');


// Получение всех всех пользователей
router.get('/users', getUsers);

// Получение пользователя по _id
router.get('/users/:userId', getUserById);

//Создание пользователя
router.post('/user', createUser);

module.exports = router;