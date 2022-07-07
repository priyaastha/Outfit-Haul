const mongoose = require("mongoose");

//defining schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,     //removes white space
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  //adding timestamps to the schema
  { timestamps: true }
);

//compiling schema to model
module.exports = mongoose.model("Category", categorySchema);
