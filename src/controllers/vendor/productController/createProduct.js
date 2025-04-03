const Product = require("../../../models/product");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
    let { name, categoryId, subCategoryId, brandId, sku, mrp, sellingPrice, discount, unitOfMeasurement, sellingUnit, shortDescription, longDescription, serviceId, status } = req.body;

    if (!name || !name.trim()) return next(new AppError("Product name is required.", 400));
    if (!categoryId) return next(new AppError("Category ID is required.", 400));
    if (!brandId) return next(new AppError("Brand ID is required.", 400));
    if (!sku) return next(new AppError("SKU is required.", 400));
    if (!mrp) return next(new AppError("MRP is required.", 400));
    if (!sellingPrice) return next(new AppError("Selling price is required.", 400));
    if (!unitOfMeasurement) return next(new AppError("Unit of measurement is required.", 400));
    if (!sellingUnit) return next(new AppError("Selling unit is required.", 400));
    if (!shortDescription) return next(new AppError("Short Description is required.", 400));
    if (!longDescription) return next(new AppError("Long Description is required.", 400));
    if (!serviceId) return next(new AppError("Service Type is required.", 400));
    let vendorId = req.vendor._id

    let skuProduct = await Product.findOne({ sku });
    if (skuProduct) return next(new AppError("SKU is already exists. Plz enter different SKU No.", 400));

    let imagePaths;
    if (req.files && req.files.images) {
        const imagesUrls = req.files.images.map((file) => {
            return `${file.destination}/${file.filename}`;
        });
        imagePaths = imagesUrls;
    }


    let product = new Product({
        name,
        categoryId,
        subCategoryId,
        brandId,
        sku,
        images: imagePaths,
        mrp,
        sellingPrice,
        discount: discount || 0,
        unitOfMeasurement,
        sellingUnit,
        shortDescription,
        longDescription,
        serviceId,
        vendorId,
        status: status || "active"
    });

    await product.save();

    return res.status(201).json({
        status: true,
        message: "Product added successfully.",
        data: { product },
        newProduct: true,
    });
});
