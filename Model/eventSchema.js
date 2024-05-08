const mongoose = require("mongoose");

// Event Schema Created
const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
    },
    event_type: {
      type: String,
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
    description: {
      type: String,
    },
    Status: {
      type: String,
    },
    eventImageUrl: [
      {
        type: String,
        default: "",
      },
    ],
    booking_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking-Detail",
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users-Profile-Data",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    eventDetail_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventDetails",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Megma-Event", eventSchema);
