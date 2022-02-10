const express = require("express");

const products = require("./products");

const app = express();

app.set("json space", 8)

app.get("/products", (req, res)=>{
    // res.json(null)
    // res.send(null);
    res.json(products)
    // res.send(products);
    // res.render()
})

app.listen(3000);