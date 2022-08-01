const ForbiddenDeleteError = require('../errors/ForbiddenDeleteError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');

const Card = require('../models/card');

// Получение всех карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError('Не удалось найти карочки'));
      }
      return res.status(200).send({
        data: cards,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// Создание карточки
module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(200).send({
      data: card,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

// Удаление карточки по по id
module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка с таким id не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenDeleteError('Нельзя удалить карточку другого пользователя'));
      }
      return card.remove();
    })
    .then(() => res.send({
      message: 'Карточка удалена',
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

// Поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    }, // добавить _id в массив, если его там нет
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

// Убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    }, // убрать _id из массива
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};
