const express = require("express");
const app = express();

var port = 8080;

const staticServe = express.static(`${ __dirname }/dist`);

app.use("/", staticServe);
app.use("*", staticServe);

app.listen(port, () => console.log('Server running'));