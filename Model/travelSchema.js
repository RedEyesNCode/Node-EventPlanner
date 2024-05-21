const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  service_name: {
    type: String,
    default: "",
  },
  travel_subcategory: {
    type: String,
    default: "",
  },
  client_name: {
    type: String,
    default: "",
  },
  type_of_coverage: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  hourly_rate: {
    type: String,
    default: "",
  },
  vehcile_type: {
    type: String,
    default: "",
  },
  pickup_location: {
    type: String,
    default: "",
  },
  dropoff_location: {
    type: String,
    default: "",
  },
  number: {
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

travelSchema.pre("save", function (next) {
  if (this.images.length === 0) {
    this.images.push(
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/truck-e1714674238616.png"
    );
  }
  next();
});

module.exports = mongoose.model("Travel", travelSchema);
