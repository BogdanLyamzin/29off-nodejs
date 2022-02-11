const createError = require("http-errors");

const products = require("../../models/products");

const removeById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await products.removeById(id);
        if(!result) {
            throw createError(404, "Not found");
        }
        res.json({
            "message": "product deleted"
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports = removeById