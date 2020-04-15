const router = require('express').Router();
let Chat = require('../models/Chat.model');

router.route('/').get((req, res) => {
    Chat.find()
      .then(chats => res.json(chats))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/add').post((req, res) => {
    const chatID = req.body.chatID;
    const participants = req.body.participants;
  
    const newChat = new Chat({chatID, participants});
  
    newChat.save()
      .then(() => res.json('new chat added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Chat.findOneAndUpdate( {chatID: req.params.id})
      .then(chat=> {
          chat.participants = req.body.participants;
  
        chat.save()
          .then(() => res.json('chat updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete/:id').delete((req, res) => {
    Chat.findOneAndDelete( {chatID: req.params.id})
          .then(() => res.json('chat deleted!'))
          .catch(err => res.status(400).json('Error: ' + err));

  });
  
  module.exports = router;