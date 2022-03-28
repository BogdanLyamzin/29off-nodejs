const {Schema, model} = require("mongoose");

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    active: {
        type: Boolean,
        default: true
    },
    // ["basic", "sale", "stock"]
    status: {
        type: String,
        enum: ["basic", "sale", "stock"],
        default: "basic"
    },
    code: {
        type: String,
        match: /^[0-9]{9}$/,
        unique: true,
        required: true
    }
}, {versionKey: false, timestamps: true});

const Product = model("product", productSchema);

module.exports = Product;