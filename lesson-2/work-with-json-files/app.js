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

// invokeAction({action: "list"});
// invokeAction({action: "getById", id: "48bd1cd8-72ca-42cc-8457-156bb8c30873"});
// invokeAction({action: "add", name: "iPhone X", price: 17000});
invokeAction({action: "removeById", id: "a9af66d2-f1ed-4dd6-a03a-bf92b1551d66"})