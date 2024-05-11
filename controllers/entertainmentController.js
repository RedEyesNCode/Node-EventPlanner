const entertainmentSchema = require("../Model/entertainmentSchema");

exports.createEntertainment = async (req, res) => {
    try {
        const newEntertainment = await entertainmentSchema(req.body);
        await newEntertainment.save();
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Entertainment Created Succesfully",
            data : newEntertainment
        });
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.deleteEntertainment = async (req, res) => {
    try {
        const Entertainment = await entertainmentSchema.findByIdAndDelete(req.body.entertainmentId);
        if (!Entertainment) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "Entertainment Not Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Entertainment Deleted Succesfully",
            data: Entertainment
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.getAllEntertainment = async (req, res) => {
    try {
        const allEntertainment = await entertainmentSchema.find();
        if (allEntertainment.length === 0) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "No Entertainment Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "All Entertainment fetched Succesfully",
            data: allEntertainment
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.uploadgEntertainmentImage =  async (req, res) => {
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
      const Entertainment = await entertainmentSchema.findById(req.body.entertainmentId);
      if (!Entertainment) {
        res.status(200).json({ status: "Failed", error: "Entertainment not found" });
        return;
      }
      Entertainment.images.push(req.file.location);
      if (
        Entertainment.images.length > 0 &&
        Entertainment.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/popcorn.png"
      ) {
        Entertainment.images.splice(0, 1);
      }
      await Entertainment.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Entertainment Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };