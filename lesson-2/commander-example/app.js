const {program} = require("commander")

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

program
    .option("-a, --action <type>", "action type")
    .option("-i, --id <type>", "id")
    .option("-n, --name <type>", "name")
    .option("-p, --price <type>", "price")

program.parse(process.argv);

const opts = program.opts();
console.log(opts)
// invokeAction(opts)


