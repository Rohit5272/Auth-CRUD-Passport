const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", Post);
