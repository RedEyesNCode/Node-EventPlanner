const cateringSchema = require("../Model/cateringSchema");

exports.createCatering = async (req, res) => {
    try {
        const newCatering = await cateringSchema(req.body);
        await newCatering.save();
        res.status(201).json({
            Status: "Success",
            code: 200,
            message: "Catering Created Succesfully",
            data : newCatering
        });
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.deleteCatering = async (req, res) => {
    try {
        const catering = await cateringSchema.findByIdAndDelete(req.body.cateringId);
        if (!catering) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "Catering Not Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Catering Deleted Succesfully",
            data: catering
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}