const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event",
  },
  BandName: {
    type: String,
  },
  band_subcategory: {
    type: String,
  },
  Genre: {
    type: String,
  },
  ContactPerson: {
    type: String,
  },
  ContactNumber: {
    type: String,
  },
  Email:{
    type: String,
  },
  Address:{
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

bandSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/parade-e1714669744336.png"
    );
  }
  next();
});

module.exports = mongoose.model("Band", bandSchema);
