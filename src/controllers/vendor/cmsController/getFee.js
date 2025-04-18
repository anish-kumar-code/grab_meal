const catchAsync = require("../../../utils/catchAsync");

exports.getFee = catchAsync(async (req, res, next) => {
    let commission = "15";
    let gst = "5";
    let onbording = "0";

    return res.status(200).json({
        success: true,
        message: "Go Rabbit Fee fetched successfully.",
        data: { commission, gst, onbording },
    });
})