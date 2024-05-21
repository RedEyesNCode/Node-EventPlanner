const mongoose = require("mongoose");

// DJ BAND SCHEMA
const DjBandSchema = new mongoose.Schema(
  {
    dj_band_name: {
      type: String,
    },
    djband_subcategory: {
      type: String,
    },
    members: {
      type: String,
    },
    genre: {
      type: String,
    },
    description: {
      type: String,
    },
    availability: {
      type: String,
    },
    rate: {
      type: String,
    },
    location: {
      type: String,
    },
    equipment: {
      type: String,
    },
    reviews: {
      type: String,
    },
    rating: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    contact_information: {
      type: String,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Megma-Event",
    },
  },
  { timestamps: true }
);
DjBandSchema.pre('save', function(next) {
    if (this.images.length === 0) {
      this.images.push("https://onetouchmoments.co.in/wp-content/uploads/2024/05/parade-e1714669744336.png");
    }
    next();
  });
  
module.exports = mongoose.model("Dj-Band", DjBandSchema);
