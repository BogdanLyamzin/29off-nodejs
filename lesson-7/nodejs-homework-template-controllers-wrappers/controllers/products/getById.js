const Product = require("../../models/product");

const {createError} = require("../../helpers");

const getById = async(req, res)=> {
    const {id} = req.params;
    const result = await Product.findById(id, "-createdAt -updatedAt");
    if(!result){
        throw createError(404);
    }
    res.json(result);
}

module.exports = getById;