const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmCode: {
    type: String, 
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);
