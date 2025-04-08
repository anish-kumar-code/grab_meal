const express = require("express");
const router = express.Router();
const fileUploader = require("../middleware/fileUploader");
const { test } = require("../controllers/vendor/testController/test");
const { signUp } = require("../controllers/vendor/authController/signUp");
const { login } = require("../controllers/vendor/authController/login");
const { logout } = require("../controllers/vendor/authController/logout");
const { getProfile } = require("../controllers/vendor/authController/getProfile");
const { vendorAuthenticate } = require("../controllers/vendor/authController/vendorAuthenticate");
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
const { createToppins } = require("../controllers/vendor/toppinsController/createToppins");
const { getAllOrder } = require("../controllers/vendor/orderController/getAllOrder");
const { todayOrder } = require("../controllers/vendor/orderController/todayOrder");
const { createCoupon } = require("../controllers/vendor/couponController/createCoupon");
const { getAllService } = require("../controllers/vendor/serviceController/getAllService");
const { getAllBrand } = require("../controllers/vendor/brandController/getAllBrand");
const { updateProductStatus } = require("../controllers/vendor/productController/updateProductStatus");
const { deleteMultipleProducts } = require("../controllers/vendor/productController/deleteMultipleProduct");

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
router.get("/service/list", getAllService)


// category
router.post("/category/create", vendorAuthenticate, fileUploader([{ name: "image", maxCount: 1 }], "category"), createCategory)
router.get("/category/list", getAllCategory)
router.post("/subcategory/list", getAllSubCategory)


// brand
router.post("/brand/create", vendorAuthenticate, fileUploader([{ name: "image", maxCount: 1 }], "brand"), createBrand);
router.get("/brand/list", getAllBrand)

// toppins
router.post("/toppins/create", vendorAuthenticate, createToppins);

// coupon
router.post("/coupon/create", vendorAuthenticate, createCoupon)

// product
router.post("/product/create",
    vendorAuthenticate,
    fileUploader("product", [
        { name: "primary_image", maxCount: 1 },
        { name: "gallery_image", maxCount: 10 }
    ]),
    createProduct
);
router.get("/product/list", vendorAuthenticate, getAllProduct)
router.get("/product/:id", vendorAuthenticate, getProduct)
router.post("/product/status", vendorAuthenticate, updateProductStatus)
router.patch(
    "/product/update/:id",
    vendorAuthenticate,
    fileUploader("product", [
      { name: "primary_image", maxCount: 1 },
      { name: "gallery_image", maxCount: 10 },
    ]),
    updateProduct
  );
router.delete("/product/delete/:id", vendorAuthenticate, deleteProduct);
router.post("/product/delete/bulk", vendorAuthenticate, deleteMultipleProducts)


// order
router.get("/order/list", vendorAuthenticate, getAllOrder)
router.get("/order/:id", vendorAuthenticate, todayOrder)
router.get("/order/today", vendorAuthenticate, todayOrder)







module.exports = router;
