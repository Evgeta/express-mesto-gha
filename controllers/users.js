const User = require('../models/user');

module.exports.getUsers =  (req, res) => {
    User.find({})
        .then(users => res.send({ data: users }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}; 

module.exports.getUserById = (req, res) => {
    User.findById(req.params.userId)
      .then((user) => {
           res.end(user);
      })
      .catch(() => res.status(404).send({ message: 'Пользователь не найден.' }));  
  };
  

module.exports.createUser =  (req, res) => {
    console.log('body');
    console.log(req.body);
    const { name, about, avatar } = req.body;
     
    User.create({ name, about, avatar })
      .then( user => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  }