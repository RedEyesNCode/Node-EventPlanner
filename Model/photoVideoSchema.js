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
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    },
      
})

module.exports = mongoose.model("Photo-Video",photoVideoSchema)