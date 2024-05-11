const bandSchema = require("../Model/bandSchema");

exports.createBand = async (req, res) => {
    try {
        const newBand = await bandSchema(req.body);
        await newBand.save();
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Band Created Succesfully",
            data : newBand
        });
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.deleteBand = async (req, res) => {
    try {
        const Band = await bandSchema.findByIdAndDelete(req.body.bandId);
        if (!Band) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "Band Not Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Band Deleted Succesfully",
            data: Band
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.getAllBand = async (req, res) => {
    try {
        const allBand = await bandSchema.find();
        if (allBand.length === 0) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "No Band Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "All Band fetched Succesfully",
            data: allBand
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.uploadgBandImage =  async (req, res) => {
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
      const Band = await bandSchema.findById(req.body.bandId);
      if (!Band) {
        res.status(200).json({ status: "Failed", error: "Band not found" });
        return;
      }
      Band.images.push(req.file.location);
      if (
        Band.images.length > 0 &&
        Band.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/parade-e1714669744336.png"
      ) {
        Band.images.splice(0, 1);
      }
      await Band.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Band Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };