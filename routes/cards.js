const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { linkRegEx } = require('../utils/regulars');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Получение всех всех карточек
router.get('/', getCards);

// Создание карточки
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(linkRegEx),
    }).messages({ 'string.pattern': 'Некорректный URL' }),
  }),
  createCard,
);

// Удаление карточки по по id
router.delete('/:cardId', deleteCardById);

// Поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);

// Убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
