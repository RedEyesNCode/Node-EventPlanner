const mongoose = require("mongoose");

const weddingDressSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    designer: {
        type: String,
        default: ""
    },
    style: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    fabric: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    availability: {
        type: String,
        default: ""
    },
    rating: {
        type: String,
        default: ""
    },
    tags: {
        type: String,
        default: ""
    },
    images : [{
        type : String
    }],
    event_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Megma-Event"
    }
})

weddingDressSchema.pre('save', function(next) {
    if (this.images.length === 0) {
      this.images.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKSUfqt4CtTfG5bnqwEN-9Sx6gsSllafcQQ&s");
    }
    next();
  });
  

module.exports = mongoose.model("Wedding-Dress", weddingDressSchema)