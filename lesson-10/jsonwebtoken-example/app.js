const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
    id: "624b26b7306ddd70fb0d1fad"
};

const token = jwt.sign(payload, SECRET_KEY);
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    // const result = jwt.verify(token, SECRET_KEY);
    const result = jwt.verify(`r${token.slice(1)}`, SECRET_KEY);
    console.log(result);
} catch (error) {
    console.log(error);
}
