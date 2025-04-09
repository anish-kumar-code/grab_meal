const Vendor = require("../../../models/vendor");
const catchAsync = require("../../../utils/catchAsync");

exports.getVendor = catchAsync(async (req, res) => {

    const vendors = await Vendor.find().populate("service_id", "name");

    return res.status(200).json({
        status: true,
        results: vendors.length,
        data: {vendors}
    })

})