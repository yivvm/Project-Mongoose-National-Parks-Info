const mongoose = require("mongoose");

const parkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fullName: {
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
  description: {
    type: String,
    required: false,
  },
});

parkSchema.index({ parkCode: 1 });

module.exports = mongoose.model("Parks", parkSchema);
