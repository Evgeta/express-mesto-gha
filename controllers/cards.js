const { INCORRECT_DATA_ERROR_CODE,
        NOT_FOUND_ERROR_CODE, 
        DEFAULT_ERROR_CODE } = require('../errors/errors');

const NotFoundError = require('../errors/NotFoundError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const DefaultError = require('../errors/DefaultError');

const Card = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({ "message": "Ошибка сервера" })
   });
};


//Создание карточки
module.exports.createCard = (req, res) => {
  console.log('card body');
  console.log(req.body);

  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError')
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ "message": "В запросе переданы некорректные данные" })
      return res.status(DEFAULT_ERROR_CODE).send({ "message": "Ошибка сервера" })
    });
}


//Удаление карточки по по id
module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => { 
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ "message": "Карточка с таким id не найдена" })}
      else { card.remove();}  
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(err => {
       return res.status(DEFAULT_ERROR_CODE).send({ "message": "Ошибка сервера" })
    });
}    


//Поставить лайк карточке
module.exports.likeCard = (req, res) => 
{
  console.log(req.params.cardId);
Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
.then((card) => { 
  if (!card) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ "message": "Карточка с таким id не найдена" })}
  else {
      res.send(card);
  }
})
.catch(err => {
   return res.status(DEFAULT_ERROR_CODE).send({ "message": "Ошибка сервера" })
});
}

//Убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.then((card) => { 
  if (!card) {
    return res.status(NOT_FOUND_ERROR_CODE).send({ "message": "Карточка с таким id не найдена" })}
  else {
      res.send(card);
  }
  })
.catch(err => {
   return res.status(DEFAULT_ERROR_CODE).send({ "message": "Ошибка сервера" })
});
}