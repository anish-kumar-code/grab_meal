const VendorOrderHistory = require("../../../models/vendorOrderHistory");
const catchAsync = require("../../../utils/catchAsync");

exports.todayOrder = catchAsync(async (req, res, next) => {

    const vendor_id = req.vendor._id;
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    let todayOrder = await VendorOrderHistory.find({ vendor_id: vendor_id, createdAt: { $gte: startOfDay, $lte: endOfDay } }).sort({ createdAt: -1 });

    return res.status(200).json({
        status: "success",
        results: todayOrder.length,
        data: todayOrder
    });
})