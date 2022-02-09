"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const politician_route_1 = require("./politician.route");
const user_route_1 = require("./user.route");
const vote_route_1 = require("./vote.route");
const admin_route_1 = require("./admin.route");
const basicAuth = require("express-basic-auth");
const options = {
    users: { 'qG4bROXcHy': '90wORSp91QJfThiKM8hQrDUnLTFg7dsd' }
};
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(basicAuth(options), politician_route_1.router)
    .use(basicAuth(options), user_route_1.router)
    .use(basicAuth(options), vote_route_1.router)
    .use(basicAuth(options), admin_route_1.router);
const port = process.env.PORT || 4201;
app.listen(port, () => {
    return console.log(`Node ! App listening on port ${port}`);
});
