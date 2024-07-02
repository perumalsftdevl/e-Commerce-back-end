const fs = require("fs");

async function DeleteImageServer(req, res) {
  try {
    const file = req.query.file;
    if (!file) {
      return res.status(400).json({
        message: "Need a File Name",
        success: false,
        error: true,
      });
    }

    const HOST = "https://e-commerce-back-end-900p.onrender.com";
    const filename = String(file).split(HOST)[1];
    fs.unlink("." + filename, function (err) {
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
        return res.status(200).json({
          message: "File Delete SuccessFully",
          success: true,
          error: false,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

module.exports = DeleteImageServer;
