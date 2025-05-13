// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//     booking_id: {
//         type: String,
//         required: true
//     },
//     product_data: {
//         type: [{
//             product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//             vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//             quantity: { type: Number, required: true },
//             price: { type: Number, required: true }
//         }],
//         required: true
//     },
//     item_total: {
//         type: Number,
//         required: true
//     },
//     coupon_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Coupon",
//         default: null
//     },
//     coupon_amt: {
//         type: Number,
//         default: 0
//     },
//     coupon_code: {
//         type: String,
//         default: null
//     },
//     after_coupon_amount: {
//         type: Number,
//         required: true
//     },
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     address_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Address",
//         required: true
//     },
//     delivery_date: {
//         type: Date,
//         required: true
//     },
//     delivery_time: {
//         type: String,  // Time format as a string (e.g., "14:30 PM")
//         required: true
//     },
//     delivery_charge: {
//         type: Number,
//         default: 0
//     },
//     order_status: {
//         type: String,
//         enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
//         default: "pending"
//     },
//     payment_mode: {
//         type: String,
//         enum: ["COD", "Online"],
//         required: true
//     },
//     payment_status: {
//         type: String,
//         enum: ["pending", "failed", "success"],
//         default: "pending"
//     },
//     payment_id: {
//         type: String,
//         default: null
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDataSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'VendorProduct',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    toppingsArray: {
        type: [String], // or ObjectId if topping is a separate model
        default: []
    },
    finalPrice: {
        type: Number,
        required: true
    }
}, { _id: false });

const OrderSchema = new Schema({
    booking_id: {
        type: String,
        required: true,
        unique: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    productData: {
        type: ProductDataSchema,
        required: true,
    },
    itemTotal: {
        type: Number,
        required: true
    },
    couponId: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon',
        default: "67ee7fa6e3b6a1a746ae4803" // only for testing purpose
    },
    couponCode: {
        type: String,
        default: ""
    },
    couponAmount: {
        type: Number,
        default: 0
    },
    afterCouponAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    packingCharge: {
        type: Number,
        default: 0
    },
    commissionRate: {
        type: Number,
        required: true
    },
    commissionAmount: {
        type: Number,
        required: true
    },
    finalTotalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'accepted', 'preparing', 'ready', 'shipped', 'out of delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    preparationTime: { type: Number, default: null },
    preparationStartedAt: { type: Date, default: null },
    readyAt: { type: Date, default: null },
    paymentMode: {
        type: String,
        enum: ['cash', 'card', 'upi', 'wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
