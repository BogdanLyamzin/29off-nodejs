const express = require("express");

const Product = require("../../models/product");

const {createError} = require("../../helpers");

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
        const result = await Product.findById(id, "-createdAt -updatedAt");
        if(!result){
            throw createError(404);
        }
        res.json(result)
    }
    catch(error) {
        next(error);
    }
})

router.post("/", async (req, res, next) => {
    try {
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