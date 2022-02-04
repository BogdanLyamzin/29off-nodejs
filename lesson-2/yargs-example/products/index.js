const fs = require("fs/promises")
const path = require("path");
const {v4} = require("uuid");

const productsPath = path.join(__dirname, "products.json");

const updateProducts = async (products)=> {
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
}

const getAll = async()=> {
    const data = await fs.readFile(productsPath);
    const products = JSON.parse(data);
    return products;
}

const getById = async(id)=> {
    const products = await getAll();
    const result = products.find(item => item.id === id);
    if(!result) {
        return null;
    }
    return result;
}

const add = async(name, price) => {
    const products = await getAll();
    const newProduct = {name, price, id: v4()};
    products.push(newProduct);
    await updateProducts(products)
    return newProduct;
}

const removeById = async(id) => {
    const products = await getAll();
    // const idx = products.findIndex(item => item.id === id);
    // if(idx === -1){
    //     return null
    // }
    // const deleteProduct = products[idx]
    // products.splice(idx, 1);
    // await updateProducts(products);
    const deleteProduct = products.find(item => item.id === id);
    if(!deleteProduct) {
        return null;
    }
    const newProducts = products.filter(item => item.id !== id);
    await updateProducts(newProducts);
    return deleteProduct
}

module.exports = {
    getAll,
    getById,
    add,
    removeById
}