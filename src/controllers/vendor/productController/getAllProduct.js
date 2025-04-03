const Product = require("../../../models/product");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllProduct = catchAsync(async (req,res,nex)=>{

    const vendor_id = req.vendor._id

    const allProduct = await Product.find({status: "active", vendorId : vendor_id});

    res.status(200).json({
        status: "success",
        results: allProduct.length,
        data: allProduct
    });
})