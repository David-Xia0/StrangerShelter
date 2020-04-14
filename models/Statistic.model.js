const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true,
    unique: false,
    trim: false
  }
}, {
  timestamps: true,
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;