const {Schema, model} = require("mongoose");
const Joi = require("joi");

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
        match: codeRegexp,
        unique: true,
        required: true
    }
}, {versionKey: false, timestamps: true});

const addSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0.01).required(),
    active: Joi.bool(),
    status: Joi.string().valueOf("basic", "sale", "stock"),
    code: Joi.string().pattern(codeRegexp).required()
});

const updateActiveSchema = Joi.object({
    active: Joi.bool().required()
})

const schemas = {
    add: addSchema,
    active: updateActiveSchema
}

const Product = model("product", productSchema);

module.exports = {
    Product,
    schemas
};