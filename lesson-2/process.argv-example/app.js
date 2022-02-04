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
const actionIndex = process.argv.indexOf("--action");
if(actionIndex !== -1){
    const action = process.argv[actionIndex + 1];
    invokeAction({action});
}

