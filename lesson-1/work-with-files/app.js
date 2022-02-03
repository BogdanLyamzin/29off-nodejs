const fs = require("fs/promises");
// const fs = require("fs").promises

const fileOperations = async(filePath, action = "read", data) => {
    switch(action) {
        case "read":
            const text = await fs.readFile(filePath, "utf-8");
            console.log(text);        
            break;
        case "add":
            await fs.appendFile(filePath, data);
            break;
        case "replace":
            await fs.writeFile(filePath, data);
            break;
    }
    // const text = await fs.readFile(filePath, "utf-8");
    // console.log(text);
    // // const data = await fs.readFile(filePath);
    // // const text = data.toString();
    // // console.log(text)
}

// fileOperations("./files/file.txt")
// fileOperations("./files/file2.txt", "add", "\nНе плюйся - никто не носит золота во рту")
fileOperations("./files/file3.txt", "replace", "Зооастризм")
// const fileRead = fs.readFile("./files/file.txt");
// fileRead.then(data => console.log(data))
// .catch(error => console.log(error.message))

