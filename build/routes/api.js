"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controller/authController");
var _userController = _interopRequireDefault(require("../controller/userController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initApiRoute = function initApiRoute(app) {
  router.get("/test-api", _authController.testApi);
  router.post("/register", _authController.handleRegister);
  router.post("/login", _authController.handleLogin);
  router.get("/user/read", _userController["default"].getListUser);
  router.post("/user/create", _userController["default"].createUser);
  router.put("/user/update", _userController["default"].updateUser);
  router["delete"]("/user/delete", _userController["default"].deleteUser);
  return app.use("/api/v1", router);
};
var _default = exports["default"] = initApiRoute;