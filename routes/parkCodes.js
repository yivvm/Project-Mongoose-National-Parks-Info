const express = require("express");
const router = express.Router();
const ParkCode = require("../models/parkCode");

// Get all
router.get("/", async (req, res) => {
  try {
    const parkCodes = await ParkCode.find();
    res.json(parkCodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
// router.get("/:id", (req, res) => {
//   res.send(req.params.id);
// });

router.get("/:parkCode", getParkCode, (req, res) => {
  res.json(res.parkCode);
});

// Create one
router.post("/", async (req, res) => {
  const parkCode = new ParkCode({
    name: req.body.name,
    parkCode: req.body.parkCode,
    type: req.body.type,
    orgCode: req.body.orgCode,
    region: req.body.region,
  });

  try {
    const newParkCode = await parkCode.save();
    res.status(201).json(newParkCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:parkCode", getParkCode, async (req, res) => {
  if (req.body.name != null) {
    res.parkCode.name = req.body.name;
  }
  if (req.body.parkCode != null) {
    res.park.parkCode = req.body.parkCode;
  }
  if (req.body.type != null) {
    res.parkCode.type = req.body.type;
  }
  if (req.body.orgCode != null) {
    res.parkCode.orgCode = req.body.orgCode;
  }
  if (req.body.region != null) {
    res.parkCode.region = req.body.region;
  }
  try {
    const updatedParkCode = await res.parkCode.save();
    res.json(updatedParkCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:parkCode", getParkCode, async (req, res) => {
  try {
    await res.parkCode.deleteOne();
    res.json({ message: "Deleted Park" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getParkCode(req, res, next) {
  let parkCode;
  try {
    parkCode = await ParkCode.findOne({
      parkCode: req.params["parkCode"].toUpperCase(),
    }).exec();
    if (parkCode == null) {
      return res.status(404).json({ message: "cannot find this park" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.parkCode = parkCode;
  next();
}

module.exports = router;
