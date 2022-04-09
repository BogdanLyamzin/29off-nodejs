const bcrypt = require("bcrypt");

password = "123456";

const hashPassword = async(password) => {
    const result = await bcrypt.hash(password, 10);
    // console.log(result)
    const compareRsult = await bcrypt.compare(password, result);
    console.log(compareRsult)
};

hashPassword(password);