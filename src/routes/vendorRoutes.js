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
const { getOrder } = require("../controllers/vendor/orderController/getOrder");
const { forgetPassword } = require("../controllers/vendor/authController/forgetPassword");
const { createShop } = require("../controllers/vendor/shopController/createShop");
const { shopDetails } = require("../controllers/vendor/shopController/shopDetails");
const { updateShop } = require("../controllers/vendor/shopController/updateShop");
const { closeShop } = require("../controllers/vendor/shopController/closeShop");
const { statusShop } = require("../controllers/vendor/shopController/statusShop");
const { vendorShopList } = require("../controllers/vendor/shopController/vendorShopList");
const { getTermCondition } = require("../controllers/vendor/cmsController/getTermCondition");
const { getFee } = require("../controllers/vendor/cmsController/getFee");
const { createCopyProduct } = require("../controllers/vendor/copyProductController/createCopyProduct");
const { createBulkCopyProduct } = require("../controllers/vendor/copyProductController/createBulkCopyProduct");
const { getAllProductForAssign } = require("../controllers/vendor/copyProductController/getAllProductForAssign");
const { getAllProductOfShop } = require("../controllers/vendor/copyProductController/getAllProductOfShop");
const { getCopyProductDetail } = require("../controllers/vendor/copyProductController/getCopyProductDetail");
const { updateCopyProductStatus } = require("../controllers/vendor/copyProductController/updateCopyProductStatus");
const { deleteCopyProduct } = require("../controllers/vendor/copyProductController/deleteCopyProduct");
const { updateCopyProduct } = require("../controllers/vendor/copyProductController/updateCopyProduct");
const { updateVendorProfile } = require("../controllers/vendor/authController/updateVendorProfile");
const { updateVendorAccount } = require("../controllers/vendor/authController/updateVendorAccount");
const { updateVendorDocument } = require("../controllers/vendor/authController/updateVendorDocument");
const { getVendorWallet } = require("../controllers/vendor/walletController/getVendorWallet");
const { getAllShopWallet } = require("../controllers/vendor/walletController/getAllShopWallet");
const { createWalletRequest } = require("../controllers/vendor/walletController/createWalletRequest");
const { getWalletRequest } = require("../controllers/vendor/walletController/getWalletRequest");
const { getVendorWalletHistory } = require("../controllers/vendor/walletController/getVendorWalletHistory");

// router.get("/test", test);

//------------------------------------------------
// auth
//------------------------------------------------
router.post("/register",
    fileUploader("vendor", [
        { name: "profileImg", maxCount: 1 },
        { name: "panImage", maxCount: 1 },
        { name: "gstImage", maxCount: 1 },
        { name: "foodImage", maxCount: 1 },
        { name: "passbook", maxCount: 1 }
    ]),
    signUp
);
router.post("/login", login);
router.get("/getProfile", vendorAuthenticate, getProfile);
router.post("/forgetPassword", forgetPassword);
router.post("/updateProfile", vendorAuthenticate, fileUploader("vendor", [{ name: "profileImage", maxCount: 1 }]), updateProfile);
router.patch("/update/profile", vendorAuthenticate, updateVendorProfile)
router.patch("/update/account", vendorAuthenticate, fileUploader("vendor", [{ name: "passbook", maxCount: 1 }]), updateVendorAccount)
router.patch("/update/document", vendorAuthenticate,
    fileUploader("vendor", [
        { name: "panImage", maxCount: 1 },
        { name: "gstImage", maxCount: 1 },
        { name: "foodImage", maxCount: 1 }
    ]), updateVendorDocument)
router.get("/logout", logout);


//------------------------------------------------
// shop
//------------------------------------------------
router.post("/shop/create", vendorAuthenticate,
    fileUploader("shop", [
        { name: "shopImage", maxCount: 1 },
        { name: "galleryImage", maxCount: 50 },
        { name: "menu", maxCount: 50 }
    ]),
    createShop
);
router.get("/shop/details/:id", vendorAuthenticate, shopDetails);
router.patch("/shop/update/:id", vendorAuthenticate,
    fileUploader("shop", [
        { name: "shopImage", maxCount: 1 },
        { name: "galleryImage", maxCount: 50 },
        { name: "menu", maxCount: 50 }
    ]),
    updateShop
);
router.get("/shop/list", vendorAuthenticate, vendorShopList)
router.post("/shop/close/:id", vendorAuthenticate, closeShop);
router.post("/shop/status/:id", vendorAuthenticate, statusShop);


//------------------------------------------------
// service
//------------------------------------------------
router.post("/service/create", createService);
router.get("/service/list", getAllService)


//------------------------------------------------
// category
//------------------------------------------------
router.post("/category/create", vendorAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), createCategory)
router.get("/category/list", getAllCategory)
router.post("/subcategory/list", getAllSubCategory)


//------------------------------------------------
// brand
//------------------------------------------------
router.post("/brand/create", vendorAuthenticate, fileUploader("brand", [{ name: "image", maxCount: 1 }]), createBrand);
router.get("/brand/list", getAllBrand)


//------------------------------------------------
// toppins
//------------------------------------------------
router.post("/toppins/create", vendorAuthenticate, createToppins);


//------------------------------------------------
// coupon
//------------------------------------------------
router.post("/coupon/create", vendorAuthenticate, createCoupon)


//------------------------------------------------
// cms pages
//------------------------------------------------
router.get("/term-and-condition", getTermCondition)
router.get("/fee", getFee)


//------------------------------------------------
// product ( these are not working)
//------------------------------------------------
router.post("/product/create",
    vendorAuthenticate,
    fileUploader("product", [
        { name: "primary_image", maxCount: 1 },
        { name: "gallery_image", maxCount: 10 }
    ]),
    createProduct
);
router.get("/product/list/:serviceId", vendorAuthenticate, getAllProduct)
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


//------------------------------------------------
// copy product
//------------------------------------------------
router.post("/copy/product/create", vendorAuthenticate, createCopyProduct)
router.get("/copy/product/all", vendorAuthenticate, getAllProductForAssign)
router.get("/shop/product/:shopId", vendorAuthenticate, getAllProductOfShop)
router.get("/copy/product/:id", vendorAuthenticate, getCopyProductDetail)
router.patch("/copy/product/status/:id", vendorAuthenticate, updateCopyProductStatus)
router.post("/copy/product/bulk/create", vendorAuthenticate, createBulkCopyProduct)
router.delete("/copy/product/delete/:id", vendorAuthenticate, deleteCopyProduct)
router.patch("/copy/product/update/:id", vendorAuthenticate, updateCopyProduct)


//------------------------------------------------
// wallet
//------------------------------------------------

router.get("/wallet", vendorAuthenticate, getVendorWallet)
router.get("/shops/wallets", vendorAuthenticate, getAllShopWallet)
// router.get("/shop/:shopId/wallet/history", vendorAuthenticate, getShopWalletHistory);
router.get("/wallet/history", vendorAuthenticate, getVendorWalletHistory)
// router.post("/admin/vendor/:vendorId/wallet/settle", adminAuthenticate, settleVendorWallet); this is for admin
// router.get("/wallet/settlements", vendorAuthenticate, getVendorWalletSettlements);


//------------------------------------------------
// wallet Request
//------------------------------------------------

router.post("/wallet/request", vendorAuthenticate, createWalletRequest)
router.get("/wallet/request", vendorAuthenticate, getWalletRequest)




//------------------------------------------------
// order
//------------------------------------------------
router.get("/order/list", vendorAuthenticate, getAllOrder)
router.get("/order/today", vendorAuthenticate, todayOrder)
router.get("/order/:id", vendorAuthenticate, getOrder)







module.exports = router;
