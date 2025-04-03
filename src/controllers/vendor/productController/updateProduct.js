const Product = require("../../../models/product");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const deleteOldFiles = require("../../../utils/deleteOldFiles");

exports.updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let { name, categoryId, subCategoryId, brandId, sku, mrp, sellingPrice, discount, unitOfMeasurement, sellingUnit, shortDescription, longDescription, serviceId, vendorId, status } = req.body;

    const product = await Product.findById(id);
    if (!product) return next(new AppError("Product not found", 404));

    let skuProduct = await Product.findOne({ sku });
    if (skuProduct) return next(new AppError("SKU is already exists. Plz enter different SKU No.", 400));

    let imagePaths = product.images;
    if (req.files && req.files.images) {
        // Delete old images
        await Promise.all(product.images.map(file => deleteOldFiles(file)));

        // Save new images
        imagePaths = req.files.images.map((file) => `${file.destination}/${file.filename}`);
    }

    product.name = name || product.name;
    product.categoryId = categoryId || product.categoryId;
    product.subCategoryId = subCategoryId || product.subCategoryId;
    product.brandId = brandId || product.brandId;
    product.sku = sku || product.sku;
    product.mrp = mrp || product.mrp;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.discount = discount || product.discount;
    product.unitOfMeasurement = unitOfMeasurement || product.unitOfMeasurement;
    product.sellingUnit = sellingUnit || product.sellingUnit;
    product.shortDescription = shortDescription || product.shortDescription;
    product.longDescription = longDescription || product.longDescription;
    product.serviceId = serviceId || product.serviceId;
    product.vendorId = vendorId || product.vendorId;
    product.status = status || product.status;
    product.images = imagePaths;

    await product.save();

    return res.status(200).json({
        status: true,
        message: "Product updated successfully.",
        data: { product }
    });
});
