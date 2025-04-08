const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    booking_id: {
        type: String,
        required: true
    },
    product_data: {
        type: [{
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }],
        required: true
    },
    item_total: {
        type: Number,
        required: true
    },
    coupon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null
    },
    coupon_amt: {
        type: Number,
        default: 0
    },
    coupon_code: {
        type: String,
        default: null
    },
    after_coupon_amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    delivery_time: {
        type: String,  // Time format as a string (e.g., "14:30 PM")
        required: true
    },
    delivery_charge: {
        type: Number,
        default: 0
    },
    order_status: {
        type: String,
        enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    payment_mode: {
        type: String,
        enum: ["COD", "Online"],
        required: true
    },
    payment_status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending"
    },
    payment_id: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
