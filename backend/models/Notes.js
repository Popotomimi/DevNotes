const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Note = mongoose.model(
  "Note",
  new Schema({
    content: {
      type: String,
      required: true,
    },
    fixed: {
      type: Boolean,
    },
  })
);

module.exports = Note;
