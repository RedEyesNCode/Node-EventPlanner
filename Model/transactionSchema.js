const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    wallet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"
    },
    amount: {
        type: String,
        default: ""
    },
    transaction_type: {
        type: String,
        default: ""
    },
    transaction_status:{
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Transactions", transactionSchema);