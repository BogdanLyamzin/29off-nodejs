const createError = require("http-errors");

const products = require("../../models/products");

const add = async(req, res) => {
    const {name, price} = req.body;
    const result = await products.add(name, price);
    res.status(201).json(result)
}

module.exports = add;