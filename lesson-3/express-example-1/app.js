const express = require("express");

const app = express();

app.get("/", (request, response)=> {
    // console.log(request.url);
    // console.log(request.method)
    // console.log(request.headers)
    response.send("<h2>Main page</h2>")
});

app.get("/contacts", (request, response)=> {
    response.send("<h2>Contacts page</h2>")
})

app.listen(3000);