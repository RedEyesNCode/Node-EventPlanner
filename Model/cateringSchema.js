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
      this.images.push("https://www.shutterstock.com/image-photo/catering-eat-food-wedding-600nw-218687860.jpg");
    }
    next();
  });
  
module.exports = mongoose.model("Catering", cateringSchema);