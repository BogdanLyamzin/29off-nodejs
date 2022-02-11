const express = require("express");

const {ctrlWrapper, validation} = require("../../middleware");
const productSchema = require("../../schemas/product")
const ctrl = require("../../controllers/products")

const router = express();

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(productSchema), ctrlWrapper(ctrl.add))

router.put("/:id", validation(productSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById))

module.exports = router;