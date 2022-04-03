const Product = require("../../models/product");

const {createError} = require("../../helpers");

const updateActive = async (req, res, next) => {
    const {id} = req.params;
    const result = await Product.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateActive;