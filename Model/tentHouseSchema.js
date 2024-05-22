const mongoose = require("mongoose");

const tentHouseSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  tenthouse_subcategory: {
    type: String,
    default: "",
  },
  String: {
    type: String,
    default: '',
  },
  adderss: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  images: [{
    type: String,
  }],
  price: {
    type: String,
    default: '',
  },
  availability: {
    type: String,
    default: '',
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event"
},
});


tentHouseSchema.pre('save', function(next) {
  if (this.images.length === 0) {
    this.images.push("https://onetouchmoments.co.in/wp-content/uploads/2024/05/tent.png");
  }
  next();
});

module.exports = mongoose.model("tentHouse", tentHouseSchema);
