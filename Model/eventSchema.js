const mongoose = require("mongoose");

// Event Schema Created
const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    event_type: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users-Profile-Data",
    },
    categorie_id: {
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
