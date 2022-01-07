const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "No heading",
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
