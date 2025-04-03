const express = require("express")
const { createAddeess } = require("../controllers/user/addressController/createAddress")
const { createOrder } = require("../controllers/user/orderController/createOrder")
const router = express.Router()

router.get("/test", (req,res)=>{
    return res.status(200).json({message : "This is user test route"})
})

// address
router.post("/address/create", createAddeess)

// order
router.post("/order/create", createOrder)


module.exports = router;