const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 


