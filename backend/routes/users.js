
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  const username = req.body.username;
  const ipv4 = ip;
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