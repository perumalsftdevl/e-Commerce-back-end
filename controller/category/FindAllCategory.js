const categoryModel = require("../../models/category");

const FindAllCategory = async (req, res) => {
  try {
    /* The line `const isCategoryAvailable = await categoryModel.find().sort({ cat_id: 1 });` is
   querying the database using the `categoryModel` to find all categories and sorting them in
   ascending order based on the `cat_id` field. The result of this query is stored in the
   `isCategoryAvailable` variable, which will contain an array of category documents retrieved from
   the database. */
    const isCategoryAvailable = await categoryModel.find().sort({ cat_id: 1 });

    /* The `return res.json({ data: isCategoryAvailable, success: true, error: false })` statement is
constructing a JSON response to be sent back to the client. Here's what each key in the response
object represents: */
    return res.json({
      data: isCategoryAvailable,
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

module.exports = FindAllCategory;
