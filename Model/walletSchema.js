const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users-Profile-Data"
    },
    balance: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: ""
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transactions"
        }
    ]
    
    
})

module.exports = mongoose.model("Wallet", walletSchema);