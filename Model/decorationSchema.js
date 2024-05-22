const mongoose = require("mongoose");

// Creating decoration Schema
const decoationSchema= new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    decor_subcategory:{
        type:String,
        default:""
    },
    members:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    hourlyRate:{
        type:String,
        default:''
    },
    minHours: {
        type:String,
        default:''
    },
    rate : {
        type:String,
        default:''
    },
    location :{
        type:String,
        default:""
    },
    number :{
        type:String,
        default:""
    },
    images : [{
        type: String
    }],
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    },

},{timestamps:true})

decoationSchema.pre('save', function(next) {
    if (this.images.length === 0) {
      this.images.push("https://onetouchmoments.co.in/wp-content/uploads/2024/05/wedding-arch.png");
    }
    next();
  });
  

module.exports= mongoose.model("Decoration",decoationSchema);