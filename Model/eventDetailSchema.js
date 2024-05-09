const mongoose = require("mongoose");

// Event Schema Created
const eventDetailSchema = new mongoose.Schema(
  {
    numberOfGuests: {
      type: String,
      default: '',
    },
    occasion: {
      type: String,
      default: "",
    },
    entry_Date: {
      type: String,
      default: "",
    },
    entry_Time: {
      type: String,
      default: "",
    },
    venue: {
      type: String,
      default: "",
    },
    food: {
      type: String,
      default: '',
    },
    music: {
      type: String,
      default: '',
    },
    seating_Arrangement: {
      type: String,
      default: '',
    },
    invite_Message: {
      type: String,
      default: "",
    },
    contact_Details: {
      type: String,
      default: "",
    },
    task: {
      type: String,
      default: "",
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Megma-Event"
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventDetails", eventDetailSchema);
