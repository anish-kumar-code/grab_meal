// const Vendor = require("../../../models/vendor");
// const AppError = require("../../../utils/AppError");
// const catchAsync = require("../../../utils/catchAsync");
// const bcrypt = require('bcrypt');
// const axios = require("axios");
// const VendorAccount = require("../../../models/vendorAccount");
// const ShopSchedule = require("../../../models/shopSchedule");

// const validateRequiredField = (field, fieldName) => {
//     if (!field || !field.trim()) return new AppError(`${fieldName} is required.`, 400);
//     return null;
// };


// exports.updateProfile = catchAsync(async (req, res, next) => {
//     let { user_id, owner_name, shop_name, mobile_no, alternate_phoneNo, email, type, gst_no, pan_no, bankName, accountNo, ifsc, branchName, schedule, service_id, address } = req.body;

//     // Validate required fields
//     const requiredFields = [
//         { field: owner_name, name: "Owner Name" },
//         { field: shop_name, name: "Shop Name" },
//         { field: mobile_no, name: "Mobile Number" },
//         { field: alternate_phoneNo, name: "Alternate Mobile Number" },
//         { field: email, name: "Email" },
//         { field: type, name: "Type" },
//         { field: user_id, name: "User ID" },
//     ];

//     for (const { field, name } of requiredFields) {
//         const error = validateRequiredField(field, name);
//         if (error) return next(error);
//     }

//     if (!Array.isArray(service_id) || service_id.length === 0) {
//         return next(new AppError("Service is required.", 400));
//     }

//     // Check if the vendor exists
//     let vendor = await Vendor.findOne({ _id: req.vendor._id });
//     if (!vendor) return next(new AppError("Vendor not found.", 404));

//     // Validate the mobile number format if changed
//     mobile_no = String(mobile_no).trim();
//     if (isNaN(mobile_no) || mobile_no.includes("e") || mobile_no.includes(".") || mobile_no.length != 10) {
//         return next(new AppError("Invalid mobile number.", 400));
//     }

//     // If email or mobile is being updated, check if it's already registered
//     if (vendor.email !== email) {
//         let vendorEmail = await Vendor.findOne({ email });
//         if (vendorEmail) return next(new AppError("Vendor with this email id already exists.", 400));
//     }

//     if (vendor.mobile_no !== mobile_no) {
//         let vendorMob = await Vendor.findOne({ mobile_no });
//         if (vendorMob) return next(new AppError("Vendor with this mobile number already exists.", 400));
//     }

//     if (vendor.user_id !== user_id) {
//         let vendoruser_id = await Vendor.findOne({ user_id });
//         if (vendoruser_id) return next(new AppError("Vendor with this user id already exists.", 400));
//     }

//     // Update vendor details
//     vendor.owner_name = owner_name || vendor.owner_name;
//     vendor.shop_name = shop_name || vendor.shop_name;
//     vendor.mobile_no = mobile_no || vendor.mobile_no;
//     vendor.alternate_phoneNo = alternate_phoneNo || vendor.alternate_phoneNo;
//     vendor.email = email || vendor.email;
//     vendor.user_id = user_id || vendor.user_id;
//     vendor.type = type || vendor.type;
//     vendor.gst_no = gst_no || vendor.gst_no;
//     vendor.pan_no = pan_no || vendor.pan_no;
//     vendor.service_id = service_id || vendor.service_id;

//     await vendor.save();

//     // vendor account update
//     let vendorAccount = await VendorAccount.findOne({ vendorId: vendor._id });
//     if (vendorAccount) {
//         // Update existing bank details
//         vendorAccount.bankName = bankName;
//         vendorAccount.accountNo = accountNo;
//         vendorAccount.ifsc = ifsc;
//         vendorAccount.branchName = branchName;
//         await vendorAccount.save();
//     } else {
//         // Create new bank details
//         vendorAccount = new VendorAccount({
//             vendorId: vendor._id,
//             bankName,
//             accountNo,
//             ifsc,
//             branchName
//         });
//         await vendorAccount.save();
//     }


//     // Shop Scheduling
//     if (!Array.isArray(schedule) || schedule.length === 0) {
//         return next(new AppError("Schedule data is required.", 400));
//     }

//     let shopSchedule = await ShopSchedule.findOne({ vendorId: vendor._id });
//     if (shopSchedule) {
//         // Update existing schedule
//         shopSchedule.schedule = schedule;
//         await shopSchedule.save();
//     } else {
//         // Create new schedule
//         shopSchedule = new ShopSchedule({
//             vendorId: vendor._id,
//             schedule: schedule
//         });
//         await shopSchedule.save();
//     }



//     return res.status(200).json({
//         status: true,
//         message: "Vendor profile updated successfully.",
//         data: { vendor, vendorAccount, shopSchedule },
//     });
// });



const Vendor = require("../../../models/vendor");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const bcrypt = require("bcrypt");
const axios = require("axios");
const VendorAccount = require("../../../models/vendorAccount");
const ShopSchedule = require("../../../models/shopSchedule");

const validateRequiredField = (field, fieldName) => {
    if (!field || !field.toString().trim()) return new AppError(`${fieldName} is required.`, 400);
    return null;
};

exports.updateProfile = catchAsync(async (req, res, next) => {
    let {
        user_id,
        owner_name,
        shop_name,
        mobile_no,
        alternate_phoneNo,
        email,
        type,
        service_id,
        food_license_no,
        lat,
        long,
        address,
        bankName,
        accountNo,
        ifsc,
        branchName,
        schedule,
    } = req.body;

    // Validate required fields
    const requiredFields = [
        { field: user_id, name: "User ID" },
        { field: owner_name, name: "Owner Name" },
        { field: shop_name, name: "Shop Name" },
        { field: mobile_no, name: "Mobile Number" },
        { field: alternate_phoneNo, name: "Alternate Mobile Number" },
        { field: email, name: "Email" },
        { field: type, name: "Type" },
        { field: food_license_no, name: "Food License No" },
        { field: lat, name: "Latitude" },
        { field: long, name: "Longitude" },
        { field: address, name: "Address" },
    ];

    for (const { field, name } of requiredFields) {
        const error = validateRequiredField(field, name);
        if (error) return next(error);
    }

    if (!Array.isArray(service_id) || service_id.length === 0) {
        return next(new AppError("Service is required.", 400));
    }

    if (!Array.isArray(schedule) || schedule.length === 0) {
        return next(new AppError("Schedule data is required.", 400));
    }

    // Retrieve the vendor document. Assumes req.vendor is set by authentication middleware.
    let vendor = await Vendor.findOne({ _id: req.vendor._id });
    if (!vendor) return next(new AppError("Vendor not found.", 404));

    // Normalize and validate mobile_no and user_id
    mobile_no = String(mobile_no).trim();
    if (!/^\d{10}$/.test(mobile_no)) {
        return next(new AppError("Invalid mobile number.", 400));
    }
    email = email.toString().trim();
    user_id = String(user_id).trim().toLowerCase();
    if (!/^[a-z0-9]+$/.test(user_id)) {
        return next(new AppError("User ID must contain only lowercase letters and numbers.", 400));
    }

    // Check for uniqueness if email, mobile or user_id are updated
    if (vendor.email !== email) {
        let vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) return next(new AppError("Vendor with this email id already exists.", 400));
    }

    if (vendor.mobile_no !== mobile_no) {
        let vendorMobile = await Vendor.findOne({ mobile_no });
        if (vendorMobile) return next(new AppError("Vendor with this mobile number already exists.", 400));
    }

    if (vendor.user_id !== user_id) {
        let vendorUser = await Vendor.findOne({ user_id });
        if (vendorUser) return next(new AppError("Vendor with this user id already exists.", 400));
    }

    let profileImageNew = vendor.profileImage;
        if (req.files && req.files.profileImage && req.files.profileImage.length > 0) {
            // Delete the old primary image if available.
            if (vendor.profileImage) {
                await deleteOldFiles(vendor.profileImage);
            }
            profileImageNew = `${req.files.profileImage[0].destination}/${req.files.profileImage[0].filename}`;
        }

    // Update vendor details
    vendor.user_id = user_id;
    vendor.profileImage = profileImageNew;
    vendor.owner_name = owner_name;
    vendor.shop_name = shop_name;
    vendor.mobile_no = mobile_no;
    vendor.alternate_phoneNo = alternate_phoneNo;
    vendor.email = email;
    vendor.type = type;
    vendor.service_id = service_id;
    vendor.food_license_no = food_license_no;
    vendor.lat = lat;
    vendor.long = long;
    vendor.address = address;

    // Update profile image if provided in req.files (optional)
    if (req.files && req.files.profileImage) {
        const url = `${req.files.profileImage[0].destination}/${req.files.profileImage[0].filename}`;
        vendor.profileImage = url;
    }

    await vendor.save();

    // Update or create vendor bank account details
    let vendorAccount = await VendorAccount.findOne({ vendorId: vendor._id });
    if (vendorAccount) {
        vendorAccount.bankName = bankName || vendorAccount.bankName;
        vendorAccount.accountNo = accountNo || vendorAccount.accountNo;
        vendorAccount.ifsc = ifsc || vendorAccount.ifsc;
        vendorAccount.branchName = branchName || vendorAccount.branchName;
        await vendorAccount.save();
    } else {
        vendorAccount = new VendorAccount({
            vendorId: vendor._id,
            bankName,
            accountNo,
            ifsc,
            branchName,
        });
        await vendorAccount.save();
    }

    // Update or create shop scheduling data
    let shopSchedule = await ShopSchedule.findOne({ vendorId: vendor._id });
    if (shopSchedule) {
        shopSchedule.schedule = schedule;
        await shopSchedule.save();
    } else {
        shopSchedule = new ShopSchedule({
            vendorId: vendor._id,
            schedule,
        });
        await shopSchedule.save();
    }

    return res.status(200).json({
        status: true,
        message: "Vendor profile updated successfully.",
        data: { vendor, vendorAccount, shopSchedule },
    });
});
