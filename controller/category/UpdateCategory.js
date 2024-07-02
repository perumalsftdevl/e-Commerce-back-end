const categoryModel = require("../../models/category");

const UpdateCategory = async (req, res) => {
  try {
    const { _id, cat_id } = req.body;

    const isCategoryAvailable = await categoryModel.find({
      cat_id: cat_id,
    });

    if (isCategoryAvailable.length == 0) {
      return res.json({
        message: "No Record Found",
        success: false,
        error: true,
      });
    }

    await categoryModel.findByIdAndUpdate(_id, req.body);
    const isCategoryAvailable2 = await categoryModel.find({
      cat_id: cat_id,
    });

    return res.json({
      data: isCategoryAvailable2,
      message: "Category update Successfully",
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

module.exports = UpdateCategory;
