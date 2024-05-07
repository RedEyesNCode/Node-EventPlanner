const mongoose = require("mongoose");

const tentHouseSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  number: {
    type: Number,
    default: 0,
  },
  adderss: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  image: [],
  price: {
    type: Number,
    default: 0,
  },
  availability: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tentHouse", tentHouseSchema);
