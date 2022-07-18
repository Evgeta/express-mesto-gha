const router = require('express').Router();

const { getCards, createCard, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору 

// Получение всех всех карточек
router.get('/', getCards);

//Создание карточки
router.post('/', createCard);

//Удаление карточки по по id
router.delete('/:cardId', deleteCardById);

//Поставить лайк карточке
router.put('/:cardId/likes', likeCard);
  
//Убрать лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;