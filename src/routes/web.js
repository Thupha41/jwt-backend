import express from "express";
import {
  getHomePage,
  getUserPage,
  postCreateUser,
} from "../controller/homeController";

const router = express.Router();

router.get("/", getHomePage);
router.get("/user", getUserPage);
router.post("/user/create-user", postCreateUser);
module.exports = router;
