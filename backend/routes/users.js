
const router = require('express').Router();
const crypto = require('crypto');
const salt = "123";
const algorithm = "aes-128-cbc";
let User = require('../models/user.model');

function encryptMessage(message) {
  var key = crypto.createCipher(algorithm, salt);
  var encrypted = key.update(message, 'utf8', 'hex');
  encrypted += key.final('hex');
  console.log(encrypted);
  return encrypted;
}

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const username = req.body.username;
  const ipv4 = " ";
  const chatID = req.body.chatID;

  const newUser = new User({username, ipv4, chatID});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/delete/:id').delete((req, res) => {
    User.findOneAndDelete({username: req.params.id })
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/deleteByChat/:id').delete((req, res) => {
    User.deleteMany({chatID: req.params.id })
      .then(() => res.json('Users in chat deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(user => {
          user.password = req.body.password;
  
        exercise.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;