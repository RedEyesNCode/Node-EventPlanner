const panditSchema = require("../Model/panditSchema");


exports.createPandit = async (req, res) => {
    try {
        const newPandit = new panditSchema(req.body);
        await newPandit.save();
        res.status(200).json({status:"Success", code:200, message: "Pandit Created Succesfully", data: newPandit});
    } catch (error) {
        res.status(200).json({status:"Failed", code:500, message: error.message});
    }
}

exports.getPandit = async (req, res) => {
    try {
        const pandit = await panditSchema.find();
        res.status(200).json({status:"Success", code:200, message: "Pandit Fetched Succesfully", data: pandit});
    } catch (error) {
        res.status(200).json({status:"Failed", code:500, message: error.message});
    }
}

exports.deletePandit = async (req, res) => {
    try {
        const pandit = await panditSchema.findByIdAndDelete(req.body.panditId);
        res.status(200).json({status:"Success", code:200, message: "Pandit Deleted Succesfully", data: pandit});
    }
    catch (error) {
        res.status(200).json({status:"Failed", code:500, message: error.message});
    }
}