const Product = require("../../models/product");

const {createError} = require("../../helpers");

const removeById = async (req, res, next) => {
    const {id} = req.params;
    const result = await Product.findByIdAndRemove(id);
    if (!result) {
        throw createError(404);
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeById;