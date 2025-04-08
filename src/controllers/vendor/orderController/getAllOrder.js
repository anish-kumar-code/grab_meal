const VendorOrderHistory = require("../../../models/vendorOrderHistory");
const catchAsync = require("../../../utils/catchAsync");

// exports.getAllOrder = catchAsync(async (req, res, next) => {

//     const vendor_id = req.vendor._id;

//     const allOrder = await VendorOrderHistory.find({ vendor_id: vendor_id }).sort({ createdAt: -1 });

//     return res.status(200).json({
//         status: "success",
//         results: allOrder.length,
//         data: { allOrder }
//     });
// })

exports.getAllOrder = catchAsync(async (req, res, next) => {
    const vendor_id = req.vendor._id;

    const allOrders = await VendorOrderHistory.find({ vendor_id: vendor_id }).populate("order_id").populate("products.product_id").sort({ createdAt: -1 });

    // Transform response: Flatten orders so each product is an individual object
    const transformedOrders = allOrders.flatMap(order =>
        order.products.map(product => ({
            order_id: order.order_id?._id || null,
            vendor_id: order.vendor_id,
            booking_id: order.booking_id,
            order_details: order.order_id || null,
            product_id: product.product_id?._id || null,
            product_details: product.product_id || null, 
            quantity: product.quantity,
            price: product.price,
            createdAt: order.createdAt
        }))
    );

    return res.status(200).json({
        status: "success",
        results: transformedOrders.length,
        orders: transformedOrders
    });
});
