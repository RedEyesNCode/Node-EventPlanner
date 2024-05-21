const venueSchema = require("../Model/venueSchema");

//Create Venue

exports.Createvenue = async (req, res) => {
  try {
    // ReqJson come from req.body
    const reqJson = ({
      venue_name,
      venue_address,
      venue_subcategory,
      venue_capacity,
      venue_contact_person,
      contact_email_phone,
      additional_services,
      parking_facility,
      alcohol_permission,
      cost,
      payment_terms,
      sequrity_needs,
    } = req.body);
    // if no reqJson data there send Error
    if (!reqJson || Object.keys(reqJson).length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No data received in the request body",
      });
    }
    // Saving Json Data to reqJson
    const newvenue = new venueSchema(reqJson);
    const savevenue = await newvenue.save();
    // Send the data in Json format
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Created Succesfully",
      data: savevenue,
    });
  } catch (error) {
    // Show Error
    res.status(200).json({
      status: "Failed",
      Code: 500,
      message: error.message,
    });
  }
};

// update Venue

exports.Updatevenue = async (req, res) => {
  try {
    // destrucreing data from req.body
    const reqJson = ({
      venue_name,
      venue_address,
      venue_capacity,
      venue_contact_person,
      contact_email_phone,
      additional_services,
      parking_facility,
      alcohol_permission,
      cost,
      payment_terms,
      sequrity_needs,
      venueId,
    } = req.body);
    // if venue id not exist then send Error
    if (!venueId) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "venueId is required",
      });
    }

    // updating Data
    const updateData = {
      venue_name: reqJson.venue_name,
      venue_address: reqJson.venue_address,
      venue_capacity: reqJson.venue_capacity,
      venue_contact_person: reqJson.venue_contact_person,
      contact_email_phone: reqJson.contact_email_phone,
      additional_services: reqJson.additional_services,
      parking_facility: reqJson.parking_facility,
      alcohol_permission: reqJson.alcohol_permission,
      cost: reqJson.cost,
      payment_terms: reqJson.payment_terms,
      sequrity_needs: reqJson.sequrity_needs,
    };
    // update data in venue Schema
    const updatedvenue = await venueSchema.findByIdAndUpdate(
      { _id: reqJson.venueId },
      { $set: updateData }, //Update the location Data
      { new: true } // Return the updated document
    );
    // not having valid venue id then show error
    if (!updatedvenue) {
      return res.status(200).json({
        status: "Failed",
        code: "400",
        message: "Please Give a Valid Venue Id",
      });
    }
    // Show data Succesfully
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Updated Successfully",
      data: updatedvenue,
    });
  } catch (error) {
    // Return error response if any error occurs
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.Searchvenue = async (req, res) => {
  try {
    // Serching by venue name and venue address
    const { venue_name, venue_address } = req.body;
    // create searchquery variable
    const searchQuery = {};
    // search by venue name
    if (venue_name) {
      searchQuery.venue_name = { $regex: new RegExp(venue_name, "i") };
    }
    // search by venue address
    if (venue_address) {
      searchQuery.venue_address = { $regex: new RegExp(venue_address, "i") };
    }
    const venue = await venueSchema.find(searchQuery).populate("event_id");
    // if venue length is 0 then show error
    if (venue.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No Venue Found to Serch Criteria",
      });
    }
    // Show Succesfully data
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Found Succesfully",
      data: venue,
    });
  } catch (error) {
    // Return error response if any error occurs
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    const { venueId } = req.body;
    const deletedvenue = await venueSchema.findByIdAndDelete(venueId);
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Deleted Successfully",
      data: deletedvenue,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      code: 500,
      message: "Venue Not Deleted",
    });
  }
};

exports.getAllVenue = async (req, res) => {
  try {
    const venue = await venueSchema.find().populate("event_id");
    if (venue.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No Venue Found",
      });
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Found Succesfully",
      data: venue,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      code: 500,
      message: "Venue Not Found",
    });
  }
};

exports.uploadVenueImage = async (req, res) => {
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
    const venue = await venueSchema.findById(req.body.venueId);
    if (!venue) {
      res.status(200).json({ status: "Failed", error: "venue not found" });
      return;
    }
    venue.images.push(req.file.location);
    if (
      venue.images.length > 0 &&
      venue.images[0] ===
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFF-AaWnJuTH3jFUuVx8q4_ULlhAtm0jl1Zw&s"
    ) {
      venue.images.splice(0, 1);
      console.log("shifted");
    }
    await venue.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Venue Image Uploaded Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
