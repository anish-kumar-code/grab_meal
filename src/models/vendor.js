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
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-z]+$/.test(v);
      },
    },
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
  },
  type: {
    type: String,
    required: true,
    enum: ["gst", "pan", "other"],
    default: "other",
  },
  gst_no: {
    type: String,
    trim: true,
  },
  pan_no: {
    type: String,
    trim: true,
  },
  // category_id: {
  //   type: String,
  //   required: true,
  // },
  service_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    }
  ],
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
