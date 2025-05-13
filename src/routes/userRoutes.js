const express = require("express")
const { createAddeess } = require("../controllers/user/addressController/createAddress")
const sendOtp = require("../controllers/user/authController/sendOtp");
const { verifyOtp } = require("../controllers/user/authController/verifyOtp");
const { getProfile } = require("../controllers/user/authController/getProfile");
const { userAuthenticate } = require("../controllers/user/authController/userAuthenticate");
const updateProfile = require("../controllers/user/authController/updateProfile");
const fileUploader = require("../middleware/fileUploader");
const { changeUserType } = require("../controllers/user/authController/chnageUserType");
const { getAllCategory } = require("../controllers/user/homeFoodController/getAllCategory");
const { getAllRecommendedProduct } = require("../controllers/user/homeFoodController/getAllRecommendedProduct");
const { getAllFeaturedProduct } = require("../controllers/user/homeFoodController/getAllFeaturedProduct");
const { getProductOfCategory } = require("../controllers/user/homeFoodController/getProductOfCategory");
const { getShopOfCategory } = require("../controllers/user/homeFoodController/getShopOfCategory");
const { getProductOfShop } = require("../controllers/user/homeFoodController/getProductOfShop");
const { getProductDetail } = require("../controllers/user/homeFoodController/getProductDetail");
const { createCart } = require("../controllers/user/cartController/createCart");
const { getCart } = require("../controllers/user/cartController/getCart");
const createOrder = require("../controllers/user/orderController/createOrder");
const getOrderDetail = require("../controllers/user/orderController/getOrderDetail");
const getAllOrder = require("../controllers/user/orderController/getAllOrder");
const router = express.Router()

// router.get("/test", (req,res)=>{
//     return res.status(200).json({message : "This is user test route"})
// })

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/profile', userAuthenticate, getProfile);
router.patch('/profile', userAuthenticate, fileUploader("user", [{ name: "image", maxCount: 1 }]), updateProfile);
router.get('/profile/type', userAuthenticate, changeUserType);


//------------------------------------------------
// Home Food Page
//------------------------------------------------
router.get('/category/list', userAuthenticate, getAllCategory);
router.get('/product/list/recommended', userAuthenticate, getAllRecommendedProduct);
router.get('/product/list/featured', userAuthenticate, getAllFeaturedProduct);
router.get('/product/category/:categoryId/list', userAuthenticate, getProductOfCategory);
router.get('/product/:categoryId/shop', userAuthenticate, getShopOfCategory);
router.get('/product/shop/:shopId/list', userAuthenticate, getProductOfShop);
router.get('/product/productdetail/:productId', userAuthenticate, getProductDetail);


//------------------------------------------------
// cart
//------------------------------------------------
router.get("/cart", userAuthenticate, getCart)
router.post("/cart", userAuthenticate, createCart)


//------------------------------------------------
// address
//------------------------------------------------
router.post("/address/create", createAddeess)



//------------------------------------------------
// order
//------------------------------------------------
router.get("/order", userAuthenticate, getAllOrder)
router.post("/order", userAuthenticate, createOrder)
router.get("/order/:orderId", userAuthenticate, getOrderDetail)


module.exports = router;