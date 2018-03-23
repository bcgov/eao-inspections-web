const express = require("express");
const app = express();

var port = 8080;

const staticServe = express.static(`${ __dirname }/dist`);

app.get("/env", function(req, res) {
    res.send({
        production: process.env.APP_ENV,
        parseId: process.env.PARSE_ID,
        parseKey: process.env.PARSE_KEY,
        parseMasterKey: process.env.PARSE_MASTER_KEY,
        parseUrl: process.env.PARSE_URL
    });
});

app.use("/", staticServe);
app.use("*", staticServe);



app.listen(port, () => console.log('Server running'));