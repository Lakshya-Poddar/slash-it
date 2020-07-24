const mongoose = require("mongoose");

const shortenschema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
  },
  hashed: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("URL", shortenschema);
