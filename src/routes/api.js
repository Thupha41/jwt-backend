import express from "express";
import {
  testApi,
  handleRegister,
  handleLogin,
} from "../controller/authController";
import UserController from "../controller/userController";
import RoleController from "../controller/roleController";
const router = express.Router();

const initApiRoute = (app) => {
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/users/read/?page=?&limit=?", UserController.getListUser);
  router.get("/users/read", UserController.getListUser);
  router.get("/roles/read", RoleController.ReadFunc);
  router.post("/users/create", UserController.createUser);
  router.put("/users/update/:id", UserController.updateUser);
  router.delete("/users/delete/:id", UserController.deleteUser);
  return app.use("/api/v1", router);
};

export default initApiRoute;
