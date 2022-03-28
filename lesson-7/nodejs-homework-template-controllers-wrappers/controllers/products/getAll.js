const Product = require("../../models/product");

const getAll = async (req, res) => {
    const {query} = req;
    const result = await Product.find(query, "-createdAt -updatedAt");
    res.json(result);
}

module.exports = getAll;