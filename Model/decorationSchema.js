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
    image : []

},{timestamps:true})

module.exports= mongoose.model("Decoration",decoationSchema);