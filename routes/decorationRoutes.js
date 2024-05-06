const express =require("express");
const { CreateDecoration } = require("../controllers/decorationConroller");
const uploadMiddleWare = require("../utils/fileupload");
const decorationSchema = require("../Model/decorationSchema");
const router=express.Router();

// post /createdecoration

router.post("/createdecoration",CreateDecoration);

// router.post("/")

// post /upload-decoration-image


router.post(
    "/upload-decoration-image",
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
        const newdecoration = await decorationSchema.findById(req.body.decorationId);
        if (!newdecoration) {
          res.status(404).json({ status: false, error: "Decoration not found" });
          return;
        }
        newdecoration.decorationimageURL.push(req.file.location);
        await newdecoration.save();
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