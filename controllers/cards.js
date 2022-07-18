const { INCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE} = require('../errors/errors')

const Card = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Создание карточки
module.exports.createCard = (req, res) => {
  console.log('card body');
  console.log(req.body);

  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

//Удаление карточки по по id
module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => { card.remove() })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

//Поставить лайк карточке
module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

//Убрать лайк с карточки
module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
