const mongoose = require("mongoose");

// Venue Schema Created

const venueSchema = new mongoose.Schema(
  {
    venue_name: {
      type: String,
    },
    venue_address: {
      type: String,
    },
    venue_subcategory : {
      type : String
    },
    venue_capacity: {
      type: String,
    },
    venue_contact_person: {
      type: String,
    },
    contact_email_phone: {
      type: String,
    },
    additional_services: {
      type: String,
    },
    parking_facility: {
      type: String,
    },
    alcohol_permission: {
      type: String,
    },
    cost: {
      type: String,
    },
    payment_terms: {
      type: String,
    },
    security_needs: {
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
  },
  { timestamps: true }
);

venueSchema.pre('save', function(next) {
  if (this.images.length === 0) {
    this.images.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFF-AaWnJuTH3jFUuVx8q4_ULlhAtm0jl1Zw&s");
  }
  next();
});



module.exports = mongoose.model("venue-Details", venueSchema);
