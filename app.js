require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const {
  NOT_FOUND_ERROR_CODE,
} = require('./errors/errors');

const app = express();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth); // нужно вернуть 401 при попытке обратиться к неавторизованномоу маршруту
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
