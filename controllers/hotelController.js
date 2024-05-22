const eventSchema = require("../Model/eventSchema");
const hotelSchema = require("../Model/hotelSchema");

exports.createhotel = async (req, res) => {
  try {
    const newHotel = new hotelSchema(req.body);
    await newHotel.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: " Hotel Created Succesfully",
      data: newHotel,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      Code: 500,
      message: error.message,
    });
  }
};
exports.getAllHotel = async (req, res) => {
  try {
    const Allhotels = await hotelSchema.find();
    if(Allhotels.length === 0){
        res.status(200).json({
            status: "Failed",
            code: 404,
            message: "No hotel found"
          });
    }
    
    res.status(200).json({
      status: "Success",
      code: 200,
      message: " Hotel fetched Succesfully",
      data: Allhotels,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      Code: 500,
      message: error.message,
    });
  }
};



exports.uploadgHotelImage =  async (req, res) => {
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
      const Hotel = await hotelSchema.findById(req.body.HotelId);
      if (!Hotel) {
        res.status(200).json({ status: "Failed", error: "Hotel not found" });
        return; 
      }
      const Event = await eventSchema.findById(Hotel.event_id);
    Event.eventImageUrl.push(req.file.location);
    await Event.save();
      Hotel.images.push(req.file.location);
      if (
        Hotel.images.length > 0 &&
        Hotel.images[0] ===
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8l4-LRrgbcWpYqdaNx6GaaauP4tkvClVoGcQgbeWz_A&s"
      ) {
        Hotel.images.splice(0, 1);
      }
      await Hotel.save();
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "Hotel Image Uploaded Succesfully",
        data: data,
      });
    } catch (error) {
      res.status(200).json({ status: "Failed", code: 500, error: error.message });
    }
  };