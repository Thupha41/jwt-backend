"use strict";

var _viewEngine = _interopRequireDefault(require("./configs/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _api = _interopRequireDefault(require("./routes/api"));
var _cors = _interopRequireDefault(require("./configs/cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var express = require("express");
require("dotenv").config();
var app = express();
var port = process.env.PORT || 8888;
var hostname = process.env.HOST_NAME;
//config template engine
(0, _viewEngine["default"])(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//Khai bao config cors
(0, _cors["default"])(app);
//Khai bao web route
app.use("/", _web["default"]);

// Khai bao api route
(0, _api["default"])(app);
app.listen(port, hostname, function () {
  console.log("Example app listening on port ".concat(port));
});