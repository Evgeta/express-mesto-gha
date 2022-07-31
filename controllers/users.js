require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// const DefaultError = require('../errors/DefaultError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const UserExistsError = require('../errors/UserExistsError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

// получение всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('Пользователи не найдены'));
      }
      return res.status(200).send({
        data: users,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// получение пользователя по id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
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
      if (err.code === 11000) { next(new UserExistsError('Пользователь с таким email уже зарегистрирован')); }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      next(err);
    });
};

// обновление профиля пользователя
module.exports.updateUserProfile = (req, res, next) => {
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
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
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
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Ошибка: Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  // if (!email || !password) {
  //   return next(new IncorrectDataError('Email или пароль не указаны'));
  // }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return next(new UnauthorizedError('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          const token = jwt.sign({ _id: 'd285e3dceed844f902650f40' }, secret, { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          });
          return res.send({ message: 'Вы успешно авторизовались.' });
        })
        .catch((err) => next(err));
    });
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectDataError('В запросе переданы некорректные данные'));
      }
      next(err);
    });
};
