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
  images : [{
    type: String,
  }],
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event"
},
});

varmalaSchema.pre('save', function(next) {
  if (this.images.length === 0) {
    this.images.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_ZHUeYI7UGET-iN2R5LS9hzGMkwDntu-Uw&s");
  }
  next();
});

module.exports = mongoose.model('Varmala', varmalaSchema);
