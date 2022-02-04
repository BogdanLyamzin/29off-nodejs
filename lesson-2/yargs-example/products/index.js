const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

// const filePath = `${__dirname}\products.json`;
const filePath = path.join(__dirname, "products.json");

const getAll = async()=> {
    const data = await fs.readFile(filePath);
    const products = JSON.parse(data);
    return products;
}

const getById = async(id) => {
    const products = await getAll();
    const result = products.find(item => item.id === id);
    if(!result){
        return null;
    }
    return result;
}

const add = async(name, price)=> {
    const data = {name, price, id: v4()};
    const products = await getAll();
    products.push(data);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return data;
}

const updateById = async(id, name, price) => {
    const products = await getAll();
    const idx = products.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    products[idx] = {id, name, price};
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return products[idx];
}

const removeById = async(id)=> {
    const products = await getAll();
    const idx = products.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const deleteProduct = products[idx];
    // const newProducts = products.filter((_, index) => idx !== index);
    // await fs.writeFile(filePath, JSON.stringify(newProducts, null, 2));
    products.splice(idx, 1);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return deleteProduct;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById
};