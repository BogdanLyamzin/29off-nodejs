const express = require("express");

const productsRouter = require("./routes/api/products")

const products = require("./products")

const app = express();

app.use("/products", productsRouter)
// app.use("/categories", categoriesRouter);

app.use((req, res)=> {
    res.status(404).json({
        message: "Not found"
    })
})

app.listen(3000)