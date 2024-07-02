const mongoose = require("mongoose");

const banner = mongoose.Schema(
  {
    url: String,
    banner_id: Number,
  },
  {
    timestamps: true,
  }
);

const bannerModel = mongoose.model("banner", banner);

module.exports = bannerModel;
