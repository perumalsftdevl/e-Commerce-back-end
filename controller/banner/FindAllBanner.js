const bannerModel = require("../../models/banner");

const FindAllBanner = async (req, res) => {
  try {
    /* The line `const isBannerAvailable = await categoryModel.find().sort({ cat_id: 1 });` is
   querying the database using the `categoryModel` to find all categories and sorting them in
   ascending order based on the `cat_id` field. The result of this query is stored in the
   `isBannerAvailable` variable, which will contain an array of category documents retrieved from
   the database. */
    const isBannerAvailable = await bannerModel.find().sort({ cat_id: 1 });

    /* The `return res.json({ data: isBannerAvailable, success: true, error: false })` statement is
constructing a JSON response to be sent back to the client. Here's what each key in the response
object represents: */
    return res.json({
      data: isBannerAvailable,
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

module.exports = FindAllBanner;
