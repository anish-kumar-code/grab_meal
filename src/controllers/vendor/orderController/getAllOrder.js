const VendorOrderHistory = require("../../../models/vendorOrderHistory");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllOrder = catchAsync(async (req, res, next) => {

    const vendor_id = req.vendor._id;

    const allOrder = await VendorOrderHistory.find({ vendor_id: vendor_id }).sort({ createdAt: -1 });

    return res.status(200).json({
        status: "success",
        results: allOrder.length,
        data: allOrder
    });

})