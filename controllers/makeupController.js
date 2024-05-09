const makeupSchema = require("../Model/makeupSchema");

exports.createmakeup = async (req, res) => {
    try {
      const makeup = new makeupSchema(req.body);
      await makeup.save();
      res
        .status(200)
        .json({
          status: "success",
          code: 200,
          message: "Makeup Created Succesfully",
          data: makeup,
        });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  exports.deletemakeup = async (req, res) => {
    try {
      const deletedmakeup = await makeupSchema.findByIdAndDelete(
        req.body.makeupId
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Makeup Deleted Succesfully",
        data: deletedmakeup,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  exports.updatemakeup = async (req, res) => {
    try {
      const updatedmakeup = await makeupSchema.findByIdAndUpdate(
        req.body.makeupId,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({
          status: "success",
          code: 200,
          message: "Makeup Updated Succesfully",
          data: updatedmakeup,
        });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };
  
  
  exports.getAllmakeup = async (req, res) => {
      try {
        const allmakeup = await makeupSchema.find().populate("event_id");

        if (allmakeup.length === 0) {
          return res.status(200).json({
            status: "Failed",
            code: 400,
            message: "No Makeup-Artist Found",
          });
        }
        res
          .status(200)
          .json({
            status: "success",
            code: 200,
            message: "All Makeup-Artist Fetched Succesfully",
            data: allmakeup,
          });
      } catch (error) {
        res.status(200).json({ status: "Failed", code: 500, error: error.message });
      }
    }