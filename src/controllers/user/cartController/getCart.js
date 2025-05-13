// controllers/getCart.js

const cart = require("../../../models/cart");


exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all active lines for this user
        const items = await cart.find({ userId, status: "active" }).populate("productId")
        // const items = await cart.find({ userId, status: "active" }).populate("productId").populate("toppings.toppingId");

        // Sum up finalPrice for each line
        const subTotal = items.reduce((sum, item) => sum + item.finalPrice, 0);

        return res.status(200).json({
            success: true,
            items,
            subTotal,
            total: subTotal,   // you could add shipping/tax here if you like
        });
    } catch (error) {
        console.error("GetCart Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while retrieving cart.",
            error: error.message,
        });
    }
};
