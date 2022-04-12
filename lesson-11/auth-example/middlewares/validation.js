const {createError} = require("../helpers");

const validation = (schema) => {
    const func = (req, res, next)=> {
        const {error} = schema.validate(req.body);
        if(error){
            const error = createError(400);
            next(error);
            return;
        }
        next();
    }

    return func;
}

module.exports = validation;