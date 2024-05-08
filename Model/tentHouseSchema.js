const mongoose = require("mongoose");

const tentHouseSchema = new mongoose.Schema({
  name: {
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
  image: [],
  price: {
    type: String,
    default: '',
  },
  availability: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model("tentHouse", tentHouseSchema);
