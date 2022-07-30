require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

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
      if (err.name === 'CastError') { return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'В запросе переданы некорректные данные id пользователя' }); }
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
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
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

module.exports.login = (req, res) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          const token = jwt.sign({ _id: 'd285e3dceed844f902650f40' }, secret, { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          });
          return res.send({ message: 'Вы успешно авторизовались.' });
        })
        .catch((err) => {
          res
            .status(401)
            .send({ message: err.message });
        });
    });
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      // if (err.name === 'CastError') { return res.status(INCORRECT_DATA_ERROR_CODE)
      // .send({ message: 'В запросе переданы некорректные данные id пользователя' }); }
      // return res.status(DEFAULT_ERROR_CODE).send({
      //   message: 'Ошибка сервера',
      // });
      next(err);
    });
};
