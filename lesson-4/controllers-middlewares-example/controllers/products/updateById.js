const createError = require("http-errors");

const products = require("../../models/products");

const updateById = async(req, res) => {
    const {id} = req.params;
    const result = await products.updateById(id, req.body);
    if(!result) {
        throw createError(404, "Not found");
    }
    res.json(result)
}

module.exports = updateById;