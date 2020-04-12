const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user_ID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  conversation_ID: {
    type: String,
    required: false,//this is not needed if we only have 1 chat
    unique: false,
    trim: false,
  },
  message: {
    type: String,
    required: true,
    unique: false,
    trim: false,
  }
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;