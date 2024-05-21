const mongoose = require("mongoose");

const photoVideoSchema = new mongoose.Schema({
    service_name:{
        type:String,
        default:""
    },
    photovideo_subcategory:{
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
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/multimedia.png"
      );
    }
    next();
  });

module.exports = mongoose.model("Photo-Video",photoVideoSchema)