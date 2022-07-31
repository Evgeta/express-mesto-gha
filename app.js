require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { linkRegEx } = require('./utils/regulars');

// const {
//   NOT_FOUND_ERROR_CODE,
// } = require('./errors/errors');

const app = express();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegEx),
  }),
}), createUser);

app.use(auth); // нужно вернуть 401 при попытке обратиться к неавторизованномоу маршруту
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(() => { throw new NotFoundError('Страница не найдена'); });
// app.use((req, res) => {
//   res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Страница не найдена' });
// });

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
