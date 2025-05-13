const Order = require("../../../models/order");

const getAllOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("productData.product_id") // Get product info
      .populate("couponId") // If a coupon was applied
      .populate("addressId") // Full address
      .populate("shopId", "name location packingCharge") // Shop info
      .populate("vendorId", "name email") // Vendor info
      .sort({ createdAt: -1 }); // Newest first

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getAllOrder;
