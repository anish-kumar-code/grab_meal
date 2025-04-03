const ShopSchedule = require("../../../models/shopSchedule");
const Vendor = require("../../../models/vendor");
const VendorAccount = require("../../../models/vendorAccount");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.getProfile = catchAsync(async (req, res, next) => {

    const vendor = await Vendor.findOne({ _id: req.vendor._id }).populate({ path: "service_id", select: "name-_id", match: { status: "active" } });
    const vendorAccountDetails = await VendorAccount.findOne({ vendorId: vendor._id });
    const shopTime = await ShopSchedule.findOne({ vendorId: vendor._id })

    return res.status(200).json({ vendor, vendorAccountDetails, shopTime, message: "Vendor Profile" });
});