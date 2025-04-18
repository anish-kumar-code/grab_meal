const Shop = require("../../../models/shop");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.vendorShopList = catchAsync(async (req, res, next) => {

    const vendorId = req.vendor._id;

    const shops = await Shop.find({ vendorId }).populate('serviceId', 'name');
    if (!shops) return next(new AppError("No shop found.", 404));

    return res.status(200).json({
        status: true,
        results: shops.length,
        data: shops
    })

})