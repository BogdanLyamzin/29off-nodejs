const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const {User, schemas} = require("../../models/user");

const {validation, auth, upload} = require("../../middlewares");
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
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const newUser = await User.create({email, avatarURL, password: hashPassword});
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
        await User.findByIdAndUpdate(user._id, {token});
        res.json({
            token
        })
    } catch (error) {
        next(error);
    }
})

router.get("/logout", auth, async(req, res, next)=> {
    try {
        await User.findByIdAndUpdate(req.user._id, {token: ""});
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.get("/current", auth, async(req, res, next)=>{
    try {
        res.json({
            email: req.user.email
        })
    } catch (error) {
        next(error);
    }
})

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch("/avatars", auth, upload.single("avatar"), async(req, res, next) => {
    try {
        const {path: tempUpload, originalname} = req.file;
        const {_id} = req.user;
        const [extention] = originalname.split(".").reverse();
        const filename = `${_id}_avatar.${extention}`;
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = `/avatars/${filename}`;
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL
        });
    } catch (error) {
        const {path: tempUpload} = req.file;
        await fs.unlink(tempUpload);
        next(error);
    }
})

module.exports = router;