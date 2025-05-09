const Category = require("../../../models/category");
const Product = require("../../../models/product");
const Service = require("../../../models/service");
const Vendor = require("../../../models/vendor");
const VendorProduct = require("../../../models/vendorProduct");
const catchAsync = require("../../../utils/catchAsync");

exports.getAllData = catchAsync(async (req, res, next) => {
    try {

        const categories = await Category.find({ cat_id: null }).populate({ path: "serviceId", select: "name" });

        // let categoryWithProduct = [];
        // for (let category of categories) {
        //     const count = await Product.countDocuments({ categoryId: category._id })
        //     categoryWithProduct.push({ ...category._doc, productCount: count })
        // }

        const subCategories = await Category.find({ cat_id: { $ne: null } });
        // let subCategoryWithProduct = [];
        // for (let subCategory of subCategories) {
        //     const count = await Product.countDocuments({ subCategoryId: subCategory._id })
        //     subCategoryWithProduct.push({ ...subCategory._doc, productCount: count })
        // }

        const services = await Service.find();
        const productCount = [];
        for (let service of services) {
            const count = await Product.countDocuments({ serviceId: service._id })
            productCount.push({ name: service.name, productCount: count })
        }

        const vendorCount = await Vendor.countDocuments()



        let countData = {
            banner: 10,
            category: categories.length,
            subCategory: subCategories.length,
            food: productCount[0].productCount,
            grocery: productCount[1].productCount,
            vendor: vendorCount,
            user: 100
        }

        return res.status(200).json({ success: true, message: "Data found", data: { countData } })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})