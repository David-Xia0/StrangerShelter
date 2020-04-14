const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  password: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 7
  },
  ipv4: {
    type: String,
    required: true,
    unique: true,
  },
  chatID: {
    type: String,
    required: false,
    unique: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;