const {Schema, model} = require("mongoose");
const Joi = require("joi")

const codeRegexp = /^[0-9]{9}$/;

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
        unique: true,
        required: true,
        match: codeRegexp
    }
}, {versionKey: false, timestamps: true})

const addProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0.01).required(),
    active: Joi.bool(),
    status: Joi.string().valueOf("basic", "sale", "stock"),
    code: Joi.string().pattern(codeRegexp).required()
})

const setActiveSchema = Joi.object({
    active: Joi.bool().required()
})

const Product = model("product", productSchema);
// categories => category
// mice => mouse

const schemas = {
    add: addProductSchema,
    active: setActiveSchema
}

module.exports = {
    Product,
    schemas
}