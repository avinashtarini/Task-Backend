const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema(
  {
    name: String,
    description: String,
    createdBy: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
