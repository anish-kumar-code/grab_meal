const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  owner_name: {
    type: String,
    required: true,
    trim: true,
  },
  shop_name: {
    type: String,
    required: true,
    trim: true,
  },
  user_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  mobile_no: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Mobile number must be a valid 10-digit number"],
  },
  alternate_phoneNo: {
    type: String,
    match: [/^\d{10}$/],
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email address is invalid"],
  },
  profileImage: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    enum: ["gst", "pan", "other"],
    default: "other", // this is not in used
  },
  gst_no: {
    type: String,
    trim: true,
    default: ""
  },
  pan_no: {
    type: String,
    trim: true,
    default: ""
  },
  service_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    }
  ],
  food_license_no: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true
  },
  long: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: 0
  },
  isBlock: {
    type: Boolean,
    default: 0
  }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
