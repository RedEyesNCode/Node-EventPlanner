const mongoose = require("mongoose");

// Creating decoration Schema
const decoationSchema= new mongoose.Schema({
    name:{
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
        type:Number,
        default:0
    },
    minHours: {
        type:String,
        default:0
    },
    rate : {
        type:String,
        default:0
    },
    location :{
        type:String,
        default:""
    },
    number :{
        type:String,
        default:""
    },
    image : []

},{timestamps:true})

module.exports= mongoose.model("Decoration",decoationSchema);