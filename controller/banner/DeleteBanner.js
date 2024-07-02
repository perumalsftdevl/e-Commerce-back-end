const bannerModel = require("../../models/banner");
const fs = require("fs");

module.exports = DeleteBanner = async (req, res) => {
  try {
    const banner_id = req.query.banner_id;

    const isCategoryAvailable = await bannerModel.find({
      banner_id: banner_id,
    });

    if (isCategoryAvailable.length > 0) {
      const HOST = process.env.PORT;
      console.log(isCategoryAvailable);
      const file = isCategoryAvailable[0].url;
      const filename = String(file).split(HOST)[1];
      fs.unlink("." + filename, async function (err) {
        if (err) {
          const errMsg = err;
          if (errMsg.message.includes("no such file or directory")) {
            return res.status(200).json({
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
          await bannerModel.deleteOne({ banner_id: banner_id });

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
