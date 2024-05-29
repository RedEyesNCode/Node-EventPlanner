const DjBandSchema = require("../Model/DjBandSchema");

exports.CreateDjband = async (req, res) => {
  try {
    const newDj = new DjBandSchema(req.body);
    const saveDj = await newDj.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Dj Band Created Succesfully",
      data: saveDj,
    });
  } catch (error) {
    // Show Error
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.DeleteDj = async (req, res) => {
  try {
    // Reqjson come from req.body with djId
    const reqJson = ({ djId } = req.body);
    if (!djId) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "Dj ID is required for delete",
      });
    }
    // Find Dj data from Schema
    const deleteDj = await DjBandSchema.findByIdAndDelete({
      _id: reqJson.djId,
    });
    // Not having Data then Show error
    if (!deleteDj) {
      return res.status(200).json({
        Status: "Failed",
        code: 400,
        message: "Please Give a valid DJ Id",
      });
    }
    // Send the Dj data Succesfully
    res.status(200).json({
      Status: "Success",
      code: 200,
      message: "Dj Deleted Succesfully",
      data: deleteDj,
    });
  } catch (error) {
    // Show Error
    res.status(200).json({
      Status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.UpdateDj = async (req, res) => {
  try {
    // Reqjson come from req.body with djId
    const reqJson = ({
      djId,
      dj_band_name,
      members,
      genre,
      description,
      availability,
      rate,
      location,
      equipment,
      reviews,
      rating,
      contact_information,
    } = req.body);
    if (!djId) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "Dj ID is required for update",
      });
    }

    // update Data
    const UpdateData = {
      dj_band_name: reqJson.dj_band_name,
      members: reqJson.members,
      genre: reqJson.genre,
      description: reqJson.description,
      availability: reqJson.availability,
      rate: reqJson.rate,
      location: reqJson.location,
      equipment: reqJson.equipment,
      reviews: reqJson.reviews,
      rating: reqJson.rating,
      contact_information: reqJson.contact_information,
    };

    // Update Data to Dj schema
    const updatedData = await DjBandSchema.findByIdAndUpdate(
      { _id: reqJson.djId },
      { $set: UpdateData }, //update the djdata
      { new: true } //return the updated document
    ).exec();
    // Not having Data then Show error
    if (!updatedData) {
      return res.status(200).json({
        Status: "Failed",
        code: 400,
        message: "Please Give a valid DJ Id",
      });
    }

    // Send Response after updating the the categories

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Event Updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    // Show Error
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.SearchDj = async (req, res) => {
  try {
    // destrucring djName and location data from req.body
    const { dj_band_name, location } = req.body;
    // Create Search  query object
    const searchQuery = {};
    // if serch query work with dj name used regex
    if (dj_band_name) {
      searchQuery.dj_band_name = { $regex: new RegExp(dj_band_name, "i") };
    }
    // if serch query work with dj location used regex

    if (location) {
      searchQuery.location = { $regex: new RegExp(location, "i") };
    }

    // Find Serched data from Schema
    const Dj = await DjBandSchema.find(searchQuery).populate("event_id");

    // if Dj length is zero then Show Error
    if (Dj.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No Dj or Band Found to Serch Criteria",
      });
    }

    // It show searched data
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Dj and Band Found Succesfully",
      data: Dj,
    });
  } catch (error) {
    // Return error response if any error occurs
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.getAllDj = async (req, res) => {
  try {
    // Find all Dj and Band data
    const Dj = await DjBandSchema.find().populate("event_id");
    // if Dj length is zero then Show Error
    if (Dj.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No Dj or Band Found",
      });
    }
    // It show all data
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Dj and Band Found Succesfully",
      data: Dj,
    });
  } catch (error) {
    // Return error response if any error occurs
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};
