const categoryModel = require("../../models/category");

const AddCategory = async (req, res) => {
  try {
    const category = req.body.category;
    const currentUser = req.userId;

    const isCategoryAvailable = await categoryModel.findOne({ category });

    console.log("isCategoryAvailable   ", isCategoryAvailable);

    if (isCategoryAvailable) {
      return res.json({
        message: "Already exits in Add to category",
        success: false,
        error: true,
      });
    }

    const existingCategories = await categoryModel.find();

    // Calculate the number of existing categories
    const existingCategoriesCount = existingCategories.length;

    // Construct payload with correct category and cat_id
    const payload = {
      category: category,
      cat_id: existingCategoriesCount + 1, // Incrementing to get the next available ID
    };
    const newCategory = new categoryModel(payload);
    const saveCategory = await newCategory.save();

    return res.json({
      data: saveCategory,
      message: "Category Added",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = AddCategory;
