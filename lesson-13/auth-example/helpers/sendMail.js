const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async(data) => {
    const email = {...data, from: "bogdan.lyamzin.d@gmail.com"};
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = sendMail;
