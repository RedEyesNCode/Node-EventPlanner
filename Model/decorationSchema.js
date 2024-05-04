const mongoose=require("mongoose");

// Creating decoration Schema
const decoationSchema= new mongoose.Schema({
    decoration_name:{
        type:String,
    },
    description:{
        type:String
    },
    decoration_type:{
        type:String
    },
    theme:{
        type:String
    },
    color:{
        type:String
    },
    size:{
        type:String
    },
    availability:{
        type:String
    },
    price:{
        type:String
    },
    decorationimageURL:{
        type:String,
        default: ""
    },
    vendor:{
        type:String
    },
    reviews:{
        type:String
    },
    rating:{
        type:String
    },
    location:{
        type:String
    },
    additional_information:{
        type:String
    },
    tags:String
},{timestamps:true})

module.exports= mongoose.model("Decoration",decoationSchema);