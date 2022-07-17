const Card = require('../models/card');

//const { getCards, createCard, deleteCardById } = require('../controllers/users');

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

  const { cardId } = req.params;
  Card.findById(cardId)
     .then((card) => {card.remove()})
     .then(() => res.send({ message: 'Карточка удалена' }))
     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
    }
