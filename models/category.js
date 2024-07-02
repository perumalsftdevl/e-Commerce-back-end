const mongoose = require("mongoose");

const category = mongoose.Schema(
  {
    category: String,
    cat_id: Number,
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("category", category);

module.exports = categoryModel;
