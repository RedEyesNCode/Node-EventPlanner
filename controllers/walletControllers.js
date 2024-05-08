const walletSchema = require("../Model/walletSchema");


exports.createWallet = async (req, res) => {
    try {
        const newWallet = new walletSchema(req.body);
        await newWallet.save();
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Wallet Created Succesfully",
            data: newWallet
        });
    } catch (error) {
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}


exports.updateWallet = async (req, res) => {
    try {
        const updateWallet = await walletSchema.findByIdAndUpdate(req.body.walletId, req.body, { new: true });
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Wallet Updated Succesfully",
            data: updateWallet
        })
    } catch (error) {
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        })
    }
}


exports.getWallet = async (req, res) => {
    try {
        const wallet = await walletSchema.findOne({ user_id: req.body.userId });
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Wallet Fetched Succesfully",
            data: wallet
        })
    } catch (error) {
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        })
    }
}