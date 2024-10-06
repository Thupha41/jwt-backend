"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = require("../controller/apiController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initApiRoute = function initApiRoute(app) {
  router.get("/test-api", _apiController.testApi);
  router.post("/register", _apiController.handleRegister);
  router.post("/login", _apiController.handleLogin);
  return app.use("/api/v1", router);
};
var _default = exports["default"] = initApiRoute;