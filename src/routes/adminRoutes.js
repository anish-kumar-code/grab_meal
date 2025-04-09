const express = require("express");
const { signup } = require("../controllers/admin/auth/signup");
const { login } = require("../controllers/admin/auth/login");
const { adminAuthenticate } = require("../controllers/admin/auth/adminAuthenticate");
const router = express.Router()

router.get("/test/admin", (req,res)=>{
    res.status(200).json({message: "Admin Route Working"});
})

router.post('/signup', signup)
router.post('/login', login)

// router.get("/test", adminAuthenticate, (req,res)=>{
//     res.status(200).json({message: "Admin Route Working Secure"});
// })




module.exports = router;