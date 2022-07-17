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

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 


