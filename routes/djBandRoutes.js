const express= require("express");
const { CreateDjband, UpdateDj, SearchDj,getAllDj,DeleteDj } = require("../controllers/djBandController");
const DjBandSchema = require("../Model/DjBandSchema");
const uploadMiddleWare = require("../utils/fileupload");
const eventSchema = require("../Model/eventSchema");

const router= express.Router();

// post /createdj

router.post('/create-dj',CreateDjband)

//post /deletedj

router.post("/delete-dj",DeleteDj);

// post /updatedj

router.post("/update-dj",UpdateDj);

// post /searchDj

router.post("/search-dj",SearchDj)

// get /get all-dj
router.get("/get-all-dj",getAllDj)

// post /upload-dj-image


router.post(
    "/upload-dj-image",

    uploadMiddleWare.single("file"),
    async (req, res) => {
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
        const djband = await DjBandSchema.findById(req.body.djId);
        if (!djband) {
          res.status(200).json({ status: "Failed", error: "DJ-Band not found" });
          return;
        }
        const Event = await eventSchema.findById(djband.event_id);
        Event.eventImageUrl.push(req.file.location);
        await Event.save();
        djband.images.push(req.file.location);
        if (
          djband.images.length > 0 &&
          djband.images[0] ===
          "https://onetouchmoments.co.in/wp-content/uploads/2024/05/parade-e1714669744336.png"
        ) {
          djband.images.splice(0, 1);
        }
        await djband.save();
        res.status(200).json({
          status: "Success",
          code: 200,
          message: "DJ-Band Image Uploaded Succesfully",
          data: data,
        });
      } catch (error) {
        res.status(200).json({ status: "Failed", code: 500, error: error.message });
      }
    }
  );
  

module.exports=router;