require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
// const auth = require('./middlewares/auth');
// const { login, createUser } = require('./controllers/users');
// const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
// const { linkRegEx } = require('./utils/regulars');

const app = express();
const router = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(linkRegEx),
//   }),
// }), createUser);

// app.use(auth);
// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));

// app.use(() => { throw new NotFoundError('Страница не найдена'); });

// app.use(errors());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
