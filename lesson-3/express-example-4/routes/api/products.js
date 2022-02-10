const express = require("express");

const products = require("../../products")

const router = express.Router();

router.get("/", (req, res)=> {
    res.json(products)
});

router.get("/:id", (req, res)=> {
    res.json(products)
});

router.post("/", (req, res)=> {
    res.json(products)
});

router.put("/:id", (req, res)=> {
    res.json(products)
});

module.exports = router;