const mongoose = require("mongoose");

const bookingDetailSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    },
    user_name: {
        type: String,
        default: ""

    },
    user_number: {
        type: String,
        default: ""

    },
    user_description: {
        type: String,
        default: ""
    },
    booking_date: {
        type: String
    },
    booking_status: {
        type: String,
        default: "Pending"
    },
    payment_status: {
        type: String,
        default: "Pending"
    },
})

module.exports = mongoose.model("Booking-Detail", bookingDetailSchema);