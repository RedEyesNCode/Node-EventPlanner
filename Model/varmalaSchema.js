const mongoose = require('mongoose');

const varmalaSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  number_of_guests: {
    type: Number,
    default: 0
  },
  requirements: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Varmala', varmalaSchema);
