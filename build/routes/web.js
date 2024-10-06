"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = require("../controller/homeController");
var _apiController = require("../controller/apiController");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
var router = _express["default"].Router();
router.get("/", _homeController.getHomePage);
router.get("/user", _homeController.getUserPage);
router.post("/user/create-user", _homeController.postCreateUser);
router.post("/delete-user/:id", _homeController.handleDeleteUser);
router.get("/user/update-user/:id", _homeController.getEditUserPage);
router.post("/user/update-user", _homeController.handleEditUser);
router.get("/api/test-api", _apiController.testApi);
module.exports = router;
