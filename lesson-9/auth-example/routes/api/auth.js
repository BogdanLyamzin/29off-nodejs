const express = require("express");
const bcrypt = require("bcrypt");

const {User, schemas} = require("../../models/user");

const {validation} = require("../../middlewares");
const {createError} = require("../../helpers");

const router = express.Router();

// signup
router.post("/register", validation(schemas.add), async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw createError(409);
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({email, password: hashPassword});
        res.status(201).json({
            message: "Add success"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;