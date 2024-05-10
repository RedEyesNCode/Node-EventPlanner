const mongoose = require("mongoose");

const cateringSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    images :[{
        type: String,
    }],
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
})
cateringSchema.pre('save', function(next) {
    if (this.images.length === 0) {
      this.images.push("https://onetouchmoments.co.in/wp-content/uploads/2024/05/food-cart.png");
    }
    next();
  });
  
module.exports = mongoose.model("Catering", cateringSchema);