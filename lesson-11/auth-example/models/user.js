const {Schema, model} = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/

const userSchema = Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
        match: emailRegexp
    },
    password: {
        type: String,
         required: true,
         minlength: 6
    },
    token: {
        type: String,
        default: ""
    }
}, {versionKey: false, timestamps: true});

const joiUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required()
})

const User = model("user", userSchema);

const schemas = {
    add: joiUserSchema
}

module.exports = {
    User,
    schemas
};