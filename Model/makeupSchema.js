const mongoose = require('mongoose');

const makeupSchema = new mongoose.Schema({
    service_name : {
        type : String,
        default : ''
    },
    first_name : {
        type : String,
        default : ''
    },
    last_name : {
        type : String,
        default : ''
    },
    members : {
        type : String,
        default : ''
    },
    description : {
        type : String,
        default : ''
    },
    hourly_rate : {
        type : String,
        default : ''
    },
    min_hours : {
        type : String,
        default : ''
    },
    rate : {
        type : String,
        default : ''
    },
    location : {
        type : String,
        default : ''
    },
    contact_information : {
        type : String,
        default : ''
    },
})

module.exports = mongoose.model('Makeup-Artist', makeupSchema);