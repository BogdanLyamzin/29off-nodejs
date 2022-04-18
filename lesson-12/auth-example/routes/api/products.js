const express = require("express");
const {isValidObjectId} = require("mongoose");

const {Product, schemas} = require("../../models/product");

const {createError} = require("../../helpers");
const {validation, auth} = require("../../middlewares");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
    try {
        const {_id} = req.user;
        const {page = 1, limit = 20, ...filter} = req.query;
        const skip = (page - 1) * limit;

        const result = await Product.find(
            {...filter, owner: _id}, 
            "-createdAt -updatedAt", {skip, limit: +limit}).populate("owner", "email");
        res.json(result);
    }
    catch(error){
        next(error);
    }
});

router.get("/:id", auth, async(req, res, next)=> {
    try {
        const {id} = req.params;
        const idCheck = isValidObjectId(id);
        if(!idCheck){
            throw createError(404);
        }
        const result = await Product.findById(id, "-createdAt -updatedAt");
        if(!result){
            throw createError(404);
        }
        res.json(result)
    }
    catch(error) {
        if(error.message.includes("Cast to ObjectId failed ")){
            error.staus = 404;
            error.message = "Not found";
        }
        next(error);
    }
})

router.post("/", auth, validation(schemas.add), async (req, res, next) => {
    try {
        const {_id} = req.user;
        const result = await Product.create({...req.body, owner: _id});
        res.status(201).json(result);
    }
    catch(error){
        if(error.message.includes("validation failed") || error.message.includes("duplicate key")){
            error.status = 400;
        }
        next(error);
    }
});

router.put("/:id", auth, async(req, res, next)=> {
    try {
        const {id} = req.params;
        const idCheck = isValidObjectId(id);
        if(!idCheck){
            throw createError(404);
        }
        const result = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    }
    catch(error){
        if(error.message.includes("validation failed") || error.message.includes("duplicate key")){
            error.status = 400;
        }
        next(error);
    }
})

router.patch("/:id/active", auth, validation(schemas.active), async(req, res, next)=> {
    try {
        const {id} = req.params;
        const idCheck = isValidObjectId(id);
        if(!idCheck){
            throw createError(404);
        }
        const result = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    }
    catch(error){
        if(error.message.includes("validation failed") || error.message.includes("duplicate key")){
            error.status = 400;
        }
        next(error);
    }
})

router.delete("/:id", auth, async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await Product.findByIdAndRemove(id);
        if(!result){
            throw createError(404);
        }
        res.json({
            message: "Delete success"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;