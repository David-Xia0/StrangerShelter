const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatID: {
    type: String,
    required: true,
    unique: true
  },
  participants: {
    type: Number,
    required: true,
    unique: false,
    trim: false
  }
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;