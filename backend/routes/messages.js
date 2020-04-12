const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
    Message.find()
      .then(messages => res.json(messages))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/newMessage').post((req, res) => {
    const user_ID = req.body.user_ID;
    const conversation_ID = "1";
    const message = req.body.message;
  
    const newMessage = new Message({user_ID, conversation_ID, message});
  
    newMessage.save()
      .then(() => res.json('new message!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });