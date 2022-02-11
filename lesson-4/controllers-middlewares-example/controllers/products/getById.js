const createError = require("http-errors");

const products = require("../../models/products");

const getById = async(req, res)=> {
    const {id} = req.params;
    const result = await products.getById(id);
    if(!result) {
        throw createError(404, "Not found");
    }
    res.json(result);
}

module.exports = getById;