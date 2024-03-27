const mongoose = require("mongoose");

const parkCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parkCode: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /[A-Za-z]{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid park code.`,
    },
  },
  type: {
    type: String,
    required: true,
  },
  orgCode: {
    type: Number,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
});

parkCodeSchema.index({ parkCode: 1 });

module.exports = mongoose.model("Image", parkCodeSchema);
