const Vendor = require("../../../models/vendor");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const createToken = require("../../../utils/createToken");
const bcrypt = require('bcrypt');

exports.login = catchAsync(async (req, res, next) => {
    const { user_id, password } = req.body;
    if (!user_id || !password)
        return next(new AppError("User id and password are required.", 404));

    const vendor = await Vendor.findOne({ user_id }).select("password");

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
        return next(new AppError("Invalid user id or password.", 404));
    }

    createToken(vendor, 200, res);
});
