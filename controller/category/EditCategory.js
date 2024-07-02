const categoryModel = require("../../models/category");

const EditCategory = async (req, res) => {
  try {
    const category = req.query.category;

    const isCategoryAvailable = await categoryModel.find({
      cat_id: category,
    });

    if (isCategoryAvailable.length > 0) {
      return res.json({
        data: isCategoryAvailable,
        success: true,
        error: false,
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

module.exports = EditCategory;
