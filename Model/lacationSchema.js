const mongoose= require("mongoose");

// location Schema Created
const lacationSchema=new mongoose.Schema({
    venue_name:{
        type:String
    },
    address:{
        type:String
    },
    capacity:{
        type:Number,
    },
    contact_number:String,
    contact_name:String,
    website:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('location',lacationSchema)