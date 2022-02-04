const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const productsOperations = require("./products");

const invokeAction = async ({action, id, name, price})=> {
    switch(action) {
        case "list":
            const products = await productsOperations.getAll();
            console.log(products)
            break;
        case "getById":
            const oneProduct = await productsOperations.getById(id);
            console.log(oneProduct);
            break;
        case "add":
            const newProduct = await productsOperations.add(name, price);
            console.log(newProduct);
            break;
        case "removeById":
            const deleteProduct = await productsOperations.removeById(id);
            console.log(deleteProduct);
            break;
        default: 
            console.log("Unknown action")
    }
}

const arr = hideBin(process.argv);
const {argv} = yargs(arr)
invokeAction(argv)

