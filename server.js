const express = require("express");
const app = express();

var port = 8080;

app.use(express.static(__dirname + "/dist"));

app.listen(port, () => console.log('Server running'));