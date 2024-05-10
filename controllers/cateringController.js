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

exports.getAllCatering = async (req, res) => {
    try {
        const allCatering = await cateringSchema.find();
        if (allCatering.length === 0) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "No Catering Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "All Catering",
            data: allCatering
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.uploadgCateringImage =  async (req, res) => {
    if (!req.file) {
      res.status(200).json({ status: "Failed", error: "please upload a file" });
      return;
    }
    let data = {};
    if (req.file) {
      data = {
        url: req.file.location,
        type: req.file.mimetype,
      };
    }
    try {
      const catering = await cateringSchema.findById(req.body.cateringId);
      if (!catering) {
        res.status(200).json({ status: "Failed", error: "Catering not found" });
        return;
      }
      catering.images.push(req.file.location);
      if (
        catering.images.length > 0 &&
        catering.images[0] ===
        "https://www.shutterstock.com/image-photo/catering-eat-food-wedding-600nw-218687860.jpg"
      ) {
        catering.images.splice(0, 1);
      }
      await catering.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Catering Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };