const mongoose = require("mongoose");

const cateringSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
})

module.exports = mongoose.model("Catering", cateringSchema);