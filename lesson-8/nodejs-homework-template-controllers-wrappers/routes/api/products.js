const express = require("express");

const {schemas} = require("../../models/product");

const products = require("../../controllers/products");

const {ctrlWrapper} = require("../../helpers");
const {validation, validateId} = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(products.getAll));

router.get("/:id", validateId, ctrlWrapper(products.getById));

router.post("/", validation(schemas.add), ctrlWrapper(products.add));

router.put("/:id", validateId, ctrlWrapper(products.updateById));

router.patch("/:id/active", validateId, validation(schemas.active), ctrlWrapper(products.updateActive));

router.delete("/:id", validateId, ctrlWrapper(products.removeById))

module.exports = router;