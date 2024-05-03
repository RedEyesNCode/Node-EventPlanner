var express = require("express");
const {
  CreateEvent,
  DeleteEvent,
  UpdateEvent,
  Allevent,
} = require("../controllers/eventController");

var router = express.Router();

// EVENT ROUTE

// post /createevent
router.post("/createevent", CreateEvent);

// post /deleteevent
router.post("/deleteevent", DeleteEvent);

// post /updateevent
router.post("/updateevent", UpdateEvent);

// get /getallevents

router.get("/getallevents", Allevent);

//Image uploading section

const uploadMiddleWare = require("../utils/fileupload");
const eventSchema = require("../Model/eventSchema");

router.post(
  "/upload-event-image",
  uploadMiddleWare.single("file"),
  async (req, res) => {
    if (!req.file) {
      res.status(403).json({ status: false, error: "please upload a file" });
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
      const event = await eventSchema.findById(req.body.eventId);
      if (!event) {
        res.status(404).json({ status: false, error: "Event not found" });
        return;
      }
      event.eventImageUrl.push(req.file.location);
      await event.save();
      res.send({
        data: data,
        status: true,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
);


module.exports = router;
