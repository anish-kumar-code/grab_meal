const express = require("express");
const { signup } = require("../controllers/admin/auth/signup");
const { login } = require("../controllers/admin/auth/login");
const { adminAuthenticate } = require("../controllers/admin/auth/adminAuthenticate");
const fileUploader = require("../middleware/fileUploader");
const { createSearchIndex } = require("../models/vendor");
const { createCategory } = require("../controllers/admin/categoryController/createCategory");
const { getVendor } = require("../controllers/admin/vendorController/getVendor");
const { getVendorDetails } = require("../controllers/admin/vendorController/getVendorDetails");
const { vendorBlock } = require("../controllers/admin/vendorController/vendorBlock");
const { vendorApprove } = require("../controllers/admin/vendorController/vendorApprove");
const { getCategory } = require("../controllers/admin/categoryController/getCategory");
const { updateCategoryStatus } = require("../controllers/admin/categoryController/updateCategoryStatus");
const { deleteCategory } = require("../controllers/admin/categoryController/deleteCategory");
const { updateCategory } = require("../controllers/admin/categoryController/updateCategory");
const { getSubCategory } = require("../controllers/admin/categoryController/getSubCategory");
const { getAllSubCategory } = require("../controllers/admin/categoryController/getAllSubCategory");
const { getAllProduct } = require("../controllers/admin/productController/getAllProduct");
const { getVendorProduct } = require("../controllers/admin/vendorController/getVendorProduct");
const { getProductDetail } = require("../controllers/admin/productController/getProductDetail");
const { updateProductStatus } = require("../controllers/admin/productController/updateProductStatus");
const { createProduct } = require("../controllers/admin/productController/createProduct");
const { getAllBrand } = require("../controllers/admin/brandController/getAllBrand");
const { getProductViaService } = require("../controllers/admin/productController/getProductViaService");
const { getSettings } = require("../controllers/admin/settingController/getSettings");
const { addSettings } = require("../controllers/admin/settingController/addSettings");
const { updateSettings } = require("../controllers/admin/settingController/updateSettings");
const { getAllShop } = require("../controllers/admin/vendorController/getAllShop");
const { getAllData } = require("../controllers/admin/dashboardController/getAllData");
const { getShop } = require("../controllers/admin/shopController/getShop");
const { createDriver } = require("../controllers/admin/driverController/createDriver");
const { getDriver } = require("../controllers/admin/driverController/showDriver");
const router = express.Router()

router.get("/test/admin", (req, res) => {
    res.status(200).json({ message: "Admin Route Working" });
})

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/signup', signup)
router.post('/login', login)
router.get("/dashboard", adminAuthenticate, getAllData)

//------------------------------------------------
// category
//------------------------------------------------
router.post('/category/create', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), createCategory)
router.get('/category/list', adminAuthenticate, getCategory)
router.patch('/category/:id', adminAuthenticate, updateCategoryStatus)
router.patch('/category/update/:id', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), updateCategory)
router.delete('/category/delete/:id', adminAuthenticate, deleteCategory)

router.get("/subcategory/list", adminAuthenticate, getAllSubCategory)
router.get("/subcategory/:id", adminAuthenticate, getSubCategory)

//------------------------------------------------
// product
//------------------------------------------------
router.post("/product/create", adminAuthenticate, fileUploader("product", [{ name: "primary_image", maxCount: 1 }, { name: "gallery_image", maxCount: 10 }]), createProduct);
router.get("/product/list", adminAuthenticate, getAllProduct)
router.get("/product/list/:id", adminAuthenticate, getProductViaService)
router.get("/product/:id", adminAuthenticate, getProductDetail)
router.patch("/product/status/:id", adminAuthenticate, updateProductStatus)

//------------------------------------------------
// brand
//------------------------------------------------
router.get("/brand/list", adminAuthenticate, getAllBrand)


//------------------------------------------------
// vendor
//------------------------------------------------
router.get("/vendor/list", getVendor)
router.get("/vendor/:id", getVendorDetails)
router.patch("/vendor/block/:id", vendorBlock)
router.patch("/vendor/approve/:id", vendorApprove);
router.get("/vendor/:id/product", adminAuthenticate, getVendorProduct)
router.get("/vendor/shop/list/:vendorId", adminAuthenticate, getAllShop)

//------------------------------------------------
// shop
//------------------------------------------------
router.get("/shop/list", getShop)


//------------------------------------------------
// driver
//------------------------------------------------
router.post("/driver/create", adminAuthenticate, fileUploader("driver", [{ name: "image", maxCount: 1 }]), createDriver);
router.get('/driver/list', adminAuthenticate, getDriver)


//------------------------------------------------
// settings
//------------------------------------------------
router.post("/settings/add", fileUploader("logo", [{ name: "image", maxCount: 1 }]), addSettings)
router.patch("/settings/update/:id", fileUploader("logo", [{ name: "image", maxCount: 1 }]), updateSettings)
router.get("/settings", getSettings)



module.exports = router;