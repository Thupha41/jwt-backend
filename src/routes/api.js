import express from "express";
import { testApi, handleRegister } from "../controller/apiController";
const router = express.Router();

const initApiRoute = (app) => {
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  return app.use("/api/v1", router);
};

export default initApiRoute;
