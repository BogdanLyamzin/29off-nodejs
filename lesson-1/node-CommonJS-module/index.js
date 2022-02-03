// CommonJS
// const nodemon = require("nodemon");

const users = require("./users");
// console.log(users);

const {admins} = require("./users");
// console.log(admins);

const currentMonth = require("./date").getCurrentMonth();
// const {getCurrentMonth} = require("./date");
// const currentMonth = getCurrentMonth();
console.log(`Сейчас ${currentMonth} месяц`);













