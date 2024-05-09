const weddingDressSchema = require("../Model/weddingDress");

exports.createWeddingDress = async (req, res) => {
    try {
        const newWeddingDress = new weddingDressSchema(req.body);
        await newWeddingDress.save();
        res.status(200).json({status:"Success", code:200, message: "Wedding Dress Created Succesfully", data: newWeddingDress});
    } catch (error) {
        res.status(200).json({status:"Error", code:400, message: error.message});
    }
}

exports.deleteWeddingDress = async (req, res) => {
    try {
        const deletedWeddingDress = await weddingDressSchema.findByIdAndDelete(req.body.weddingDressId);
        if(!deletedWeddingDress) {
            return res.status(200).json({status:"Error", code:400, message: "Wedding Dress Not Found"});
        }
        res.status(200).json({status:"Success", code:200, message: "Wedding Dress Deleted Succesfully", data: deletedWeddingDress});
    } catch (error) {
        res.status(200).json({status:"Error", code:400, message: error.message});
    }
}