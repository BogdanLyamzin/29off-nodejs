const products = require("../../models/products");

const getAll = async(req, res)=>{
    const result = await products.getAll();
    res.json(result);
}

module.exports = getAll;