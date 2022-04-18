const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "xiwam18681@leafzie.com",
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Новое письмо с сайта",
    html: "<p>Новый заказ с сайта</p>"
};

sgMail.send(email)
    .then(()=> console.log("Email success send"))
    .catch(error => console.log(error.message))