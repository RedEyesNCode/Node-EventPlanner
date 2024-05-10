const mongoose = require("mongoose");

const photoVideoSchema = new mongoose.Schema({
    service_name:{
        type:String,
        default:""
    },
    client_name :{
        type:String,
        default:""
    },
    type_of_coverage :{
        type:String,
        default:""
    },
    duration:{
        type:String,
        default:""
    },
    hourly_rate :{
        type:String,
        default:""
    },
    contact_information:{
        type:String,
        default:""
    },
    images: [{
        type: String
    }],
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    },
      
})

photoVideoSchema.pre("save", function (next) {
    if (this.images.length === 0) {
      this.images.push(
        "https://www.adorama.com/alc/wp-content/uploads/2021/11/Types-of-Shots-for-Filmmakers-e1641493485327-1024x590.jpg"
      );
    }
    next();
  });

module.exports = mongoose.model("Photo-Video",photoVideoSchema)