const {isValidObjectId} = require("mongoose");

const {createError} = require("../helpers");

const validateId = (req, res, next)=> {
    const result = isValidObjectId(req.params.id);
    if(!result) {
        const error = createError(404, "id wrong format");
        next(error);
        return;
    }
    next();
}

module.exports = validateId;