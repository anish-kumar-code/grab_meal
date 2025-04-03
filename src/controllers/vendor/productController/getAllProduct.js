const Product = require("../../../models/product");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req,res,nex)=>{
    const allProduct = await Product.find({status: "active"});

    res.status(200).json({
        status: "success",
        results: allProduct.length,
        data: allProduct
    });
})