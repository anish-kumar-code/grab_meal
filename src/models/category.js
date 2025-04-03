const mongoose = require("mongoose");

const category = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cat_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

const Category = mongoose.model("Category", category);
module.exports = Category;