const express = require("express");
const createError = require("http-errors");

const {Product, schemas} = require("../../models/product")

const router = express();

router.get("/", async(req, res, next)=>{
    try {
        const result = await Product.find({}, "-createdAt -updatedAt");
        res.json(result);
    }
    catch(error){
        next(error)
    }
})

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await Product.findById(id)
        if(!result) {
            throw createError(404, "Not found");
        }
        res.json(result);
    }
    catch(error) {
        next(error)
    }
})

router.post("/", async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error) {
            throw createError(400, error.message)
        }
        const result = await Product.create(req.body)
        res.status(201).json(result)
    }
    catch(error){
        if(error.message.includes("validation failed")) {
            error.status = 400;
        }
        next(error);
    }
})

router.put("/:id", async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error) {
            throw createError(400, error.message)
        }
        const {id} = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if(!result) {
            throw createError(404, "Not found");
        }
        res.json(result)
    }
    catch(error) {
        next(error);
    }
})

router.patch("/:id/active", async(req, res, next) => {
    try {
        const {error} = schemas.active.validate(req.body);
        if(error) {
            throw createError(400, error.message)
        }
        const {id} = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body, {new: true})
        if(!result) {
            throw createError(404, "Not found");
        }
        res.json(result)
    }
    catch(error) {
        next(error);
    }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Product.findByIdAndRemove(id);
        if(!result) {
            throw createError(404, "Not found");
        }
        res.json({
            "message": "product deleted"
        })
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;