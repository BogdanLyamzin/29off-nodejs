const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {User, schemas} = require("../../models/user");

const {validation} = require("../../middlewares");
const {createError} = require("../../helpers");

const router = express.Router();

const {SECRET_KEY} = process.env;

// signup
router.post("/register", validation(schemas.add), async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw createError(409);
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(password, salt);
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, password: hashPassword});
        res.status(201).json({
            user: {
                email: newUser.email
            }
        })
    } catch (error) {
        next(error);
    }
});

router.post("/login", validation(schemas.add), async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            createError(401, `Email ${email} not found`);
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            createError(401, "Password wrong");
        }
        const payload = {
            id: user._id
        };
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        res.json({
            token
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;