const transactionSchema = require("../Model/transactionSchema");
const walletSchema = require("../Model/walletSchema");

exports.createTransaction = async (req, res) => {
    try {
        const transaction = new transactionSchema(req.body);
        await transaction.save();
        const wallet = await walletSchema.findById(req.body.wallet_id);
        wallet.transactions.push(transaction._id);
        wallet.balance = req.body.transaction_type === "credit" ? wallet.balance + parseInt(req.body.amount) : wallet.balance - parseInt(req.body.amount);
        await wallet.save();
        res.status(200).json({status:"Success", code:200, message: "Transaction Created Succesfully", data: transaction});

    } catch (error) {
        res.status(200).json({status:"Failed", code:400, message: error.message});
    }
}


exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionSchema.findByIdAndDelete(req.body.transactionId);
        res.status(200).json({status:"Success", code:200, message: "Transaction Deleted Succesfully", data: transaction});
    } catch (error) {
        res.status(200).json({status:"Failed", code:400, message: error.message});
    }
}