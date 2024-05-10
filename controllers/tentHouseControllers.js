const tentHouseSchema = require("../Model/tentHouseSchema");//photo video #//tent house# // decoration-null# // pandit# // wedding dress#$ //Cater(create nai chali)

exports.createTentHouse = async (req, res) => {
  try {
    const newTentHouse = new tentHouseSchema(req.body);
    await newTentHouse.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Tent House Created Succesfully",
      data: newTentHouse,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getAllTentHouse = async (req, res) => {
  try {
    const tentHouses = await tentHouseSchema.find().populate("event_id");
    if (tentHouses.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "No Tent House found",
      });
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Tent House Found Succesfully",
      data:tentHouses,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.deleteTentHouse = async (req, res) => {
  try {
    const deletedtent = await tentHouseSchema.findByIdAndDelete(
      req.body.tentId
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      message: deletedtent
        ? "Tent House Deleted Succesfully"
        : "No Tent House Found with this ID",
      data: deletedtent ? deletedtent : "Error in fetching Tent House",
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.updateTentHouse = async (req, res) => {
  try {
    const updatedtent = await tentHouseSchema.findByIdAndUpdate(
      req.body.tentId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      message: updatedtent
        ? "Tent House Updated Succesfully"
        : "No Tent House Found with this ID",
      data: updatedtent ? updatedtent : "Error in fetching Tent House",
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.uploadTentImage =  async (req, res) => {
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
    const tentHouse = await tentHouseSchema.findById(req.body.tenthouseId);
    if (!tentHouse) {
      res.status(200).json({ status: "Failed", error: "Tent House not found" });
      return;
    }
    tentHouse.images.push(req.file.location);
    if (
      tentHouse.images.length > 0 &&
      tentHouse.images[0] ===
      "https://onetouchmoments.co.in/wp-content/uploads/2024/05/tent.png"
    ) {
      tentHouse.images.splice(0, 1);
    }
    await tentHouse.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Tent House Image Uploaded Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
