const Product = require("../../models/product");

const {createError} = require("../../helpers");

const updateById = async (req, res) => {
    const {id} = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateById;