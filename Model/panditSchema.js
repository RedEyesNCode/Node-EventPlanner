const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  speciality: {
    type: String,
    default: "",
  },
  years_of_experience: {
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
panditSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/hindu.png"
    );
  }
  next();
});

module.exports = mongoose.model("Megma-Pandit", panditSchema);
