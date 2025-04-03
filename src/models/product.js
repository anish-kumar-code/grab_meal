const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    images: [{
        type: String,
        required: true
    }],
    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    unitOfMeasurement: {
        type: String,
        // enum: ['gram', 'kg', 'pcs'],
        required: true
    },
    sellingUnit: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
