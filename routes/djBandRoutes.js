const express= require("express");
const { CreateDjband, UpdateDj, SearchDj } = require("../controllers/djBandController");
const DjBandSchema = require("../Model/DjBandSchema");
const uploadMiddleWare = require("../utils/fileupload");

const router= express.Router();

// post /createdj

router.post('/createdj',CreateDjband)

// post /updatedj

router.post("/updatedj",UpdateDj);

// post /searchDj

router.post("/searchDj",SearchDj)

// post /upload-dj-image


router.post(
    "/upload-dj-image",

    uploadMiddleWare.single("file"),
    async (req, res) => {
      if (!req.file) {
        res.status(200).json({ status: false, error: "please upload a file" });
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
        const dj = await DjBandSchema.findById(req.body.djId);
        if (!dj) {
          res.status(404).json({ status: false, error: "DJ not found" });
          return;
        }
        dj.djBandImageUrl.push(req.file.location);
        await dj.save();
        res.send({
          data: data,
          status: true,
        });
      } catch (error) {
        res.status(500).json({ status: false, error: error.message });
      }
    }
  );
  

module.exports=router;