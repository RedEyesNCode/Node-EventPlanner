const mongoose = require("mongoose");

const dholSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event",
  },
  GroupName: {
    type: String,
  },
  ContactPerson: {
    type: String,
  },
  ContactNumber: {
    type: String,
  },
  Email: {
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

dholSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/drum.png"
    );
  }
  next();
});

module.exports = mongoose.model("Dhol", dholSchema);
