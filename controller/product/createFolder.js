const fs = require("fs");

async function CreateFolder(req, res) {
  try {
    const file = req.file;
    const category = req.query.category;
    console.log("File", file, category);
    if (category) {
      let folder_name = String(category).replace(/[^a-zA-Z0-9-_]/g, "");

      console.log("folder_name", folder_name);
      if (!fs.existsSync(`./assets/${folder_name}`)) {
        fs.mkdirSync(`./assets/${folder_name}`, { recursive: true });
        res.send({
          message: "File uploaded successfully",
          url: `${process.env.PORT}/assets/${folder_name}/${file.filename}`,
        });
        return res.send(`Folder '${folder_name}' created successfully.`);
      } else {
        return res.send({
          message: "File uploaded successfully",
          url: `${process.env.PORT}/assets/${folder_name}/${file.filename}`,
        });
      }
    } else {
      return res.status(400).json({
        message: "Need a Folder Name",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}

module.exports = CreateFolder;
