const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
