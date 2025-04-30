const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
    brandName: { type: String, default: "" },
    logo: { type: String, default: "" },
    commission: { type: String, default: "" },
    gst: { type: String, default: "" },
    onboardingFee: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    agreement: { type: String, default: "" },
    termAndConditions: { type: String, default: "" },
    privacyPolicy: { type: String, default: "" },
    refundPolicy: { type: String, default: "" },
})

const Setting = mongoose.model("setting", settingSchema)
module.exports = Setting;