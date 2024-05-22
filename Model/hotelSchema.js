const mongoose = require("mongoose");

// location Schema Created
const hotelSchema = new mongoose.Schema({
  hotel_name: {
    type: String,
  },
  hotel_address: {
    type: String,
  },
  hotel_subcategory: {
    type: String,
  },
  hotel_capacity: {
    type: String,
  },
  hotel_number: {
    type: String,
  },
  hotel_checkin: {
    type: String,
  },
  hotel_checkout: {
    type: String,
  },
  hotel_price: {
    type: String,
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

hotelSchema.pre("save", function (next) {
    if (this.images.length === 0) {
      this.images.push(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8l4-LRrgbcWpYqdaNx6GaaauP4tkvClVoGcQgbeWz_A&s"
      );
    }
    next();
  });

module.exports = mongoose.model("Hotels", hotelSchema);
