const router = require('express').Router();

const { getCards, createCard, deleteCardById } = require('../controllers/cards');

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору 

// Получение всех всех карточек
router.get('/', getCards);

//Создание карточки
router.post('/', createCard);

// Удаление карточки по по id
router.delete('/:cardId', deleteCardById);

module.exports = router;