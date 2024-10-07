import express from "express";
import {
  testApi,
  handleRegister,
  handleLogin,
} from "../controller/authController";
import UserController from "../controller/userController";
const router = express.Router();

const initApiRoute = (app) => {
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/user/read", UserController.getListUser);
  router.post("/user/create", UserController.createUser);
  router.put("/user/update", UserController.updateUser);
  router.delete("/user/delete", UserController.deleteUser);
  return app.use("/api/v1", router);
};

export default initApiRoute;
