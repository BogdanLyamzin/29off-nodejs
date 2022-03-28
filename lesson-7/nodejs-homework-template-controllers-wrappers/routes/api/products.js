const express = require("express");

const products = require("../../controllers/products");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(products.getAll));

router.get("/:id", ctrlWrapper(products.getById));

router.post("/", ctrlWrapper(products.add));

router.put("/:id", ctrlWrapper(products.updateById));

router.delete("/:id", ctrlWrapper(products.removeById))

module.exports = router;