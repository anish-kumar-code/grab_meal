const Vendor = require("../../../models/vendor");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const bcrypt = require('bcrypt');
const axios = require("axios");

const validateRequiredField = (field, fieldName) => {
  if (!field || !field.trim()) return new AppError(`${fieldName} is required.`, 400);
  return null;
};

exports.signUp = catchAsync(async (req, res, next) => {
  let {
    owner_name,
    shop_name,
    user_id,
    password,
    mobile_no,
    alternate_phoneNo,
    email,
    type,
    gst_no,
    pan_no,
    service_id
  } = req.body;

  const requiredFields = [
    { field: owner_name, name: "Owner Name" },
    { field: shop_name, name: "Shop Name" },
    { field: user_id, name: "User ID" },
    { field: password, name: "Password" },
    { field: mobile_no, name: "Mobile Number" },
    { field: alternate_phoneNo, name: "Alternate Mobile Number" },
    { field: email, name: "Email" },
    { field: type, name: "Type" },
  ];

  for (const { field, name } of requiredFields) {
    const error = validateRequiredField(field, name);
    if (error) return next(error);
  }

  if (!Array.isArray(service_id) || service_id.length === 0) {
    return next(new AppError("Service is required.", 400));
  }

  mobile_no = String(mobile_no).trim();
  email = email ? String(email).trim() : null;
  gst_no = gst_no ? String(gst_no).trim() : null;
  pan_no = pan_no ? String(pan_no).trim() : "";
  user_id = String(user_id).trim().toLocaleLowerCase();

  if (!/^[a-z]+$/.test(user_id)) {
    return next(new AppError("User ID must contain only letters (a-z).", 400));
  }

  if (
    isNaN(mobile_no) ||
    mobile_no.includes("e") ||
    mobile_no.includes(".") ||
    mobile_no.length != 10
  ) {
    return next(new AppError("Invalid mobile number.", 400));
  }

  let vendorUserId = await Vendor.findOne({ user_id });
  if (vendorUserId) return next(new AppError("Vendor with this user id already exists.", 400));

  let vendorMob = await Vendor.findOne({ mobile_no });
  if (vendorMob) return next(new AppError("Vendor with this mobile number already exists.", 400));

  let vendorEmail = await Vendor.findOne({ email });
  if (vendorEmail) return next(new AppError("Vendor with this email id already exists.", 400));


  let profileImagePath;
  if (req.files && req.files.profileImage) {
    const url = `${req.files.profileImage[0].destination}/${req.files.profileImage[0].filename}`;
    profileImagePath = url;
  } else {
    profileImagePath = ""
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  vendor = new Vendor({
    owner_name,
    shop_name,
    user_id,
    password: hashedPassword,
    mobile_no,
    alternate_phoneNo,
    email,
    profileImage: profileImagePath,
    type,
    gst_no,
    pan_no,
    service_id
  });

  await vendor.save();

  return res.status(201).json({
    status: true,
    message: "Vendor Register Successfully please wait for account approval!",
    data: { vendor },
    newVendor: true,
  });
});
