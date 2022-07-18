const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

// Слушаем 3000 порт 
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(bodyParser.json());

//временное решение для авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '62d534ecb17d7ddf882d92d8' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 


