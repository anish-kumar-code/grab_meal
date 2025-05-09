const WalletRequest = require("../../../models/walletRequest");
const catchAsync = require("../../../utils/catchAsync");

exports.getWalletRequest = catchAsync(async (req, res, next) => {
    try {

        const vendorId = req.vendor._id;

        // const shop_list = await Shop.find({vendorId}).select("wallet_balance")
        const wallet_request = await WalletRequest.find({ vendorId })

        return res.status(201).json({ message: "Vendor wallet request", status: "success", wallet_request });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", status: "notsuccess", error: error.message });
    }
})