const OrderDetails = require("../../../models/orderDetails");
const { populate } = require("../../../models/vendor");
const VendorOrderHistory = require("../../../models/vendorOrderHistory");
const catchAsync = require("../../../utils/catchAsync");

exports.getOrder = catchAsync(async (req, res, next) => {

    const _id = req.params.id;
    const vendor_id = req.vendor._id;

    // const order = await VendorOrderHistory.find({order_id : order_id, vendor_id: vendor_id});
    const order = await OrderDetails.findOne({ _id: _id, vendor_id: vendor_id }).populate({ path: "product_id" }).populate({ path: "order_id", populate: { path: "address_id" } });
    if (!order) return next(new AppError("Order not found", 404));

    const responseData = {
        images: order.product_id.primary_image || [],
        name: order.product_id.name || "",
        customer_name: "Name",
        quantity: order.quantity,
        booking_id: order.booking_id,
        delivery_date: order.order_id?.delivery_date,
        delivery_time: order.order_id?.delivery_time,
        payment_mode: order.order_id?.payment_mode,
        payment_status: order.order_id?.payment_status,
        address: order.order_id?.address_id || "",
    };

    return res.status(200).json({
        status: "success",
        data: { responseData }
    });
})