const User = require('../models/user');

const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../errors/errors');

// получение всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка сервера',
      });
    });
};

// получение пользователя по id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'В запросе переданы некорректные данные' }); }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка сервера',
      });
    });
};

// создание пользователя
module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'В запросе переданы некорректные данные' }); }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка сервера',
      });
    });
};

// обновление профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate({
    _id: req.user._id,
  }, {
    name,
    about,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({
          message: 'В запросе переданы некорректные данные',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка сервера',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({
          message: 'В запросе переданы некорректные данные',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка сервера',
      });
    });
};
