const express = require("express");
const router = express.Router();
const Park = require("../models/park");

// Get all
router.get("/", async (req, res) => {
  try {
    const parksInfo = await Park.find();
    res.json(parksInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
// router.get("/:id", (req, res) => {
//   res.send(req.params.id);
// });

router.get("/:parkCode", getParkInfo, (req, res) => {
  res.json(res.park);
});

// Create one
router.post("/", async (req, res) => {
  const park = new Park({
    name: req.body.name,
    fullName: req.body.fullName,
    parkCode: req.body.parkCode,
    description: req.body.description,
  });

  try {
    const newPark = await park.save();
    res.status(201).json(newPark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:parkCode", getParkInfo, async (req, res) => {
  if (req.body.name != null) {
    res.park.name = req.body.name;
  }
  if (req.body.fullName != null) {
    res.park.fullName = req.body.fullName;
  }
  if (req.body.parkCode != null) {
    res.park.parkCode = req.body.parkCode;
  }
  if (req.body.description != null) {
    res.park.description = req.body.description;
  }
  try {
    const updatedPark = await res.park.save();
    res.json(updatedPark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:parkCode", getParkInfo, async (req, res) => {
  try {
    await res.park.deleteOne();
    res.json({ message: "Deleted Park" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getParkInfo(req, res, next) {
  let park;
  try {
    // park = await Park.findById(req.params.id);
    park = await Park.findOne({ parkCode: req.params["parkCode"] }).exec();
    if (park == null) {
      return res.status(404).json({ message: "cannot find this park" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.park = park;
  next();
}

module.exports = router;
