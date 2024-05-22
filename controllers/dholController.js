const dholSchema = require("../Model/dholSchema");
const eventSchema = require("../Model/eventSchema");

exports.createDhol = async (req, res) => {
    try {
        const newDhol = await dholSchema(req.body);
        await newDhol.save();
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Dhol Created Succesfully",
            data : newDhol
        });
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.deleteDhol = async (req, res) => {
    try {
        const dhol = await dholSchema.findByIdAndDelete(req.body.dholId);
        if (!dhol) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "Dhol Not Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "Dhol Deleted Succesfully",
            data: dhol
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.getAllDhol = async (req, res) => {
    try {
        const allDhol = await dholSchema.find();
        if (allDhol.length === 0) {
            return res.status(200).json({
                Status: "Failed",
                code: 404,
                message: "No Dhol Found"
            })
        }
        res.status(200).json({
            Status: "Success",
            code: 200,
            message: "All Dhol fetched Succesfully",
            data: allDhol
        })
    } catch (error) {
        res.status(200).json({
            Status: "Failed",
            code: 500,
            message: error.message
        })
    }
}

exports.uploadgDholImage =  async (req, res) => {
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
      const Dhol = await dholSchema.findById(req.body.dholId);
      if (!Dhol) {
        res.status(200).json({ status: "Failed", error: "Dhol not found" });
        return;
      }
      const Event = await eventSchema.findById(Dhol.event_id);
    Event.eventImageUrl.push(req.file.location);
    await Event.save();
      Dhol.images.push(req.file.location);
      if (
        Dhol.images.length > 0 &&
        Dhol.images[0] ===
        "https://onetouchmoments.co.in/wp-content/uploads/2024/05/drum.png"
      ) {
        Dhol.images.splice(0, 1);
      }
      await Dhol.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Dhol Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };