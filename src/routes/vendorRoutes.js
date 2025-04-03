const express = require("express");
const router = express.Router();
const { test } = require("../controllers/vendor/testController/test");
const { signUp } = require("../controllers/vendor/authController/signUp");
const { login } = require("../controllers/vendor/authController/login");
const { logout } = require("../controllers/vendor/authController/logout");
const { getProfile } = require("../controllers/vendor/authController/getProfile");
const { vendorAuthenticate } = require("../controllers/vendor/authController/vendorAuthenticate");
const fileUploader = require("../middleware/fileUploader");
const { updateProfile } = require("../controllers/vendor/authController/updateProfile");
const { createService } = require("../controllers/vendor/serviceController/createService");
const { createCategory } = require("../controllers/vendor/categoryController/createCategory");
const { getAllCategory } = require("../controllers/vendor/categoryController/getAllCategory");
const { getAllSubCategory } = require("../controllers/vendor/categoryController/getAllSubCategory");
const { createBrand } = require("../controllers/vendor/brandController/createBrand");
const { createProduct } = require("../controllers/vendor/productController/createProduct");
const { deleteProduct } = require("../controllers/vendor/productController/deleteProduct");
const { updateProduct } = require("../controllers/vendor/productController/updateProduct");
const { getAllProduct } = require("../controllers/vendor/productController/getAllProduct");
const { getProduct } = require("../controllers/vendor/productController/getProduct");

router.get("/test", test);

// auth
router.post("/register", fileUploader([{ name: "profileImage", maxCount: 1 }], "vendor"), signUp);
router.post("/login", login);
router.get("/getProfile", vendorAuthenticate, getProfile);
// router.patch("/updateProfile", vendorAuthenticate, fileUploader([{ name: "profileImage", maxCount: 1 }], "vendor"), updateProfile);
router.patch("/updateProfile", vendorAuthenticate, updateProfile);
router.get("/logout", logout);


// service
router.post("/service/create", createService);


// category
router.post("/category/create", vendorAuthenticate, fileUploader([{ name: "image", maxCount: 1 }], "category"), createCategory)
router.get("/category/list", getAllCategory)
router.post("/subcategory/list", getAllSubCategory)


// brand
router.post("/brand/create", vendorAuthenticate, fileUploader([{ name: "image", maxCount: 1 }], "brand"), createBrand);

// product
router.post("/product/create", vendorAuthenticate, fileUploader([{ name: "images", maxCount: 10 }], "product"), createProduct);
router.get("/product/list", getAllProduct)
router.get("/product/:id", getProduct)
router.patch("/product/update/:id", vendorAuthenticate, fileUploader([{ name: "images", maxCount: 10 }], "product"), updateProduct);
router.delete("/product/delete/:id", vendorAuthenticate, deleteProduct)







module.exports = router;
