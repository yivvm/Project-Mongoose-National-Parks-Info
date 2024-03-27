const express = require("express");
const router = express.Router();
const Image = require("../models/image");

// Get all
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
// router.get("/:id", (req, res) => {
//   res.send(req.params.id);
// });

router.get("/:id", getImageInfo, (req, res) => {
  res.json(res.image);
});

// Create one
router.post("/", async (req, res) => {
  const image = new Image({
    id: req.body.id,
    parkCode: req.body.parkCode,
    image: req.body.image,
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", getImageInfo, async (req, res) => {
  if (req.body.id != null) {
    res.image.id = req.body.id;
  }
  if (req.body.parkCode != null) {
    res.image.parkCode = req.body.parkCode;
  }
  if (req.body.image != null) {
    res.image.image = req.body.image;
  }
  try {
    const updatedImage = await res.image.save();
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getImageInfo, async (req, res) => {
  try {
    await res.image.deleteOne();
    res.json({ message: "Deleted Image" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getImageInfo(req, res, next) {
  let image;
  try {
    image = await Image.findById(req.params.id);
    // image = await Image.findOne({ parkCode: req.params["parkCode"] }).exec();
    if (image == null) {
      return res.status(404).json({ message: "cannot find this image" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.image = image;
  next();
}

module.exports = router;
