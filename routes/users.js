const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');


// Получение всех всех пользователей
router.get('/', getUsers);

// Получение пользователя по _id
router.get('/:userId', getUserById);

//Создание пользователя
router.post('/', createUser);



module.exports = router;