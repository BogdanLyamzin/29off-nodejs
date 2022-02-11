const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const products = require("../../models/products");

const router = express();

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0.01).required()
});

/*
1. Получить все товары.
2. Получить один товар по id.
3. Добавить товар.
4. Обновить товар по id.
5. Удалить товар по id.
*/

router.get("/", async(req, res, next)=>{
    try {
        const result = await products.getAll();
        res.json(result);
    }
    catch(error){
        next(error)
        // res.status(500).json({
        //     message: error.message
        // })
    }
})

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await products.getById(id);
        if(!result) {
            throw createError(404, "Not found");
            // const error = new Error("Not found");
            // error.status = 404;
            // throw error;
            // res.status(404).json({
            //     "message": "Not found"
            // });
            // return;
        }
        res.json(result);
    }
    catch(error) {
        next(error)
    }
})

router.post("/", async(req, res, next) => {
    try {
        const {error} = productSchema.validate(req.body);
        if(error) {
            throw createError(400, error.message)
        }
        const {name, price} = req.body;
        const result = await products.add(name, price);
        res.status(201).json(result)
    }
    catch(error){
        next(error);
    }
})

router.put("/:id", async(req, res, next) => {
    try {
        const {error} = productSchema.validate(req.body);
        if(error) {
            throw createError(400, error.message)
        }
        const {id} = req.params;
        const result = await products.updateById(id, req.body);
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
        const result = await products.removeById(id);
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