const express = require("express");
const app = express();

const hostname = '127.0.0.2';
const port = 3000;
const URL = 'http://localhost:3001/'


app.use("/Lab1", function (request, response) {
    response.redirect(URL)
});

app.use(function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
