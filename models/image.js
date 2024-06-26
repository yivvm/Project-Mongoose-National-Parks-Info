const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  parkCode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /[A-Za-z]{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid park code.`,
    },
  },
  image: {
    type: String,
    required: true,
  },
});

imageSchema.index({ id: 1 });

module.exports = mongoose.model("Image", imageSchema);
