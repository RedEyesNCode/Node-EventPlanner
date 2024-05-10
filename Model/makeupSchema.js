const mongoose = require("mongoose");

const makeupSchema = new mongoose.Schema({
  service_name: {
    type: String,
    default: "",
  },
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  members: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  hourly_rate: {
    type: String,
    default: "",
  },
  min_hours: {
    type: String,
    default: "",
  },
  rate: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  contact_information: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event",
  },
});
makeupSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://content.jdmagicbox.com/comp/mumbai/w8/022pxx22.xx22.200313161453.w5w8/catalogue/creative-makeup-artist-mumbai-1xka2nvity.jpg"
    );
  }
  next();
});

module.exports = mongoose.model("Makeup-Artist", makeupSchema);
