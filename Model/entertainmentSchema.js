const mongoose = require("mongoose");

const entertainmentSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Megma-Event",
  },
  EventName: {
    type: String,
  },
  entertainment_subcategory: {
    type: String,
    default : ""
  },
  EventDescription: {
    type: String,
  },
  EventType : {
    type: String,
  },
  EventDateTime: {
    type: String,
  },
  Duration:{
    type: String,
  },
  TicketPrice:{
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

entertainmentSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/popcorn.png"
    );
  }
  next();
});

module.exports = mongoose.model("Entertainment", entertainmentSchema);
