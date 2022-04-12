const express = require("express");
const {isValidObjectId} = require("mongoose");

const {Product, schemas} = require("../../models/product");

const {createError} = require("../../helpers");
const {validation} = require("../../middlewares");

const router = express.Router();

router.get("/", async (req, res, next)=> {
    try {
        const {query} = req;
        const result = await Product.find(query, "-createdAt -updatedAt");
        res.json(result);
    }
    catch(error){
        next(error);
    }
});

router.get("/:id", async(req, res, next)=> {
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

router.post("/", validation(schemas.add), async (req, res, next) => {
    try {
        // const {error} = productSchema.validate(req.body);
        // if(error){
        //     throw createError(400, error.message);
        // }
        const result = await Product.create(req.body);
        res.status(201).json(result);
    }
    catch(error){
        if(error.message.includes("validation failed") || error.message.includes("duplicate key")){
            error.status = 400;
        }
        next(error);
    }
});

router.put("/:id", async(req, res, next)=> {
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

router.patch("/:id/active", validation(schemas.active), async(req, res, next)=> {
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

router.delete("/:id", async(req, res, next)=> {
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