import express from "express";
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
} from "../controller/homeController";

const router = express.Router();

router.get("/", getHomePage);
router.get("/user", getCreateUserPage);
router.post("/user/create-user", postCreateUser);
module.exports = router;
