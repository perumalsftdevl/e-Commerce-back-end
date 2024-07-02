const bannerModel = require("../../models/banner");

const addBanner = async (req, res) => {
  try {
    const file = req.file;
    const url = `${process.env.PORT}/assets/Banner/${file.filename}`;

    const existingURL = await bannerModel.find();

    // Calculate the number of existing URL
    const existingURLCount = existingURL.length;

    // Construct payload with correct category and cat_id
    const payload = {
      url: url,
      banner_id: existingURLCount + 1, // Incrementing to get the next available ID
    };
    const newURL = new bannerModel(payload);
    const saveURL = await newURL.save();

    return res.json({
      data: saveURL,
      message: "Banner Added",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addBanner;
