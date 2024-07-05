const bannerModel = require("../../models/banner");
const fs = require("fs");

module.exports = DeleteBanner = async (req, res) => {
  try {
    const url = req.query.url;

    const isCategoryAvailable = await bannerModel.find({
      url: url,
    });

    if (isCategoryAvailable.length > 0) {
      const HOST = "https://e-commerce-back-end-900p.onrender.com";
      console.log(isCategoryAvailable);
      const file = isCategoryAvailable[0].url;
      const filename = String(file).split(HOST)[1];
      fs.unlink("." + filename, async function (err) {
        if (err) {
          const errMsg = err;
          if (errMsg.message.includes("no such file or directory")) {
            return res.status(url200).json({
              message: "File Not Found",
              success: false,
              error: true,
            });
          } else {
            return res.status(500).json({
              message: err.message,
              success: false,
              error: true,
            });
          }
        } else {
          await bannerModel.deleteOne({ url: url });

          return res.status(200).json({
            message: "Banner Delete SuccessFully",
            success: true,
            error: false,
          });
        }
      });
    } else {
      return res.json({
        message: "No Record Found",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
