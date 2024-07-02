const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Import controllers and middleware
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const CreateFolder = require("../controller/product/createFolder");
const DeleteImageServer = require("../controller/product/deleteproductimage");
const AddCategory = require("../controller/category/AddCategory");
const EditCategory = require("../controller/category/EditCategory");
const UpdateCategory = require("../controller/category/UpdateCategory");
const FindAllCategory = require("../controller/category/FindAllCategory");
const FindAllBanner = require("../controller/banner/FindAllBanner");
const addBanner = require("../controller/banner/AddBanner");
const DeleteBanner = require("../controller/banner/DeleteBanner");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req", req.query.category);
    // Get the folder name from request parameters or query
    const folderName = req.query.category; // Assuming it's passed as form data

    // Create the full path where to store the file
    const uploadPath = path.join("./assets", folderName);

    // Create the folder if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err, null);
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Admin panel routes
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Product routes
router.post("/upload-product", authToken, UploadProductController);
router.post(
  "/upload-product/CreateFolder",
  upload.single("file"),
  CreateFolder
);

router.post("/DeleteImage", DeleteImageServer);

router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Serve static files (uploaded assets)
router.use("/assets", express.static(path.join(__dirname, "../assets")));

// Route to serve uploaded files
router.get("/file/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(__dirname, "../assets", folder, filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// User add to cart routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
router.post("/add-category", AddCategory);
router.get("/edit-category", EditCategory);
router.post("/update-category", UpdateCategory);
router.get("/FindAllCategory", FindAllCategory);

router.get("/FindAllBanner", FindAllBanner);

const storageBanner = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("./assets/Banner");

    // Create the folder if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err, null);
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const uploadBanner = multer({ storage: storageBanner });

router.post("/AddBanner", uploadBanner.single("file"), addBanner);
router.get("/DeleteBanner", DeleteBanner);

module.exports = router;
