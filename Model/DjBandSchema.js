const mongoose= require("mongoose");

const DjBandSchema=new mongoose.Schema({
    dj_band_name:{
        type:String
    },
    members:{
        type:String
    },
    genre:{
        type:String
    },
    description:{
        type:String
    },
    availability:{
        type:String
    },
    rate:{
        type:String
    },
    location:{
        type:String
    },
    equipment:{
        type:String
    },
    reviews:{
        type:String
    },
    rating:{
        type:String
    },
    djBandImageUrl:[
        {
            type:String,
            default: ""
        }
    ],
    contact_information:{
        type:String
    }
},{timestamps:true});

module.exports= mongoose.model("Dj-Band",DjBandSchema);