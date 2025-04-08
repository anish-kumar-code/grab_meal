const VendorOrderHistory = require("../../../models/vendorOrderHistory");
const catchAsync = require("../../../utils/catchAsync");

exports.getOrder = catchAsync(async (req, res, next) => {

    const order_id = req.parms.id;
    const vendor_id = req.vendor._id;

    const order = await VendorOrderHistory.find({order_id : order_id, vendor_id: vendor_id});

    return res.status(200).json({
        status: "success",
        data: {order}
    });
})