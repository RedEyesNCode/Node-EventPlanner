const mongoose=require("mongoose");

// Event Schema Created
const eventDetailSchema = new mongoose.Schema({
    numberOfGuests:{
        type:Number,
        default:0
    },
    occasion:{
        type:String,
        default:""
    },
    entry_Date:{
        type : String,
        default:""
    },
    entry_Time:{
        type : String,
        default:""
    },
    venue : {
        type : String,
        default:""
    },
    food : {
        type : Boolean,
        default : false
    },
    music : {
        type : Boolean,
        default : false
    },
    seating_Arrangement : {
        type : Boolean,
        default : false
    },
    invite_Message :{
        type : String,
        default:""
    },
    contact_Details : {
        type : String,
        default:""
    },
    task : {
        type : String,
        default:""
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "eventSchema",
    }
},{timestamps:true})


module.exports= mongoose.model('Event-Detail',eventDetailSchema);