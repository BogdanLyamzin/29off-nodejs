const Product = require("../../models/product");

const add = async (req, res) => {
    const result = await Product.create(req.body);
    res.status(201).json(result);
}

module.exports = add;