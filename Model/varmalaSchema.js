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
    type: String,
    default: ''
  },
  requirements: {
    type: String,
    default: ''
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event"
},
});

module.exports = mongoose.model('Varmala', varmalaSchema);
