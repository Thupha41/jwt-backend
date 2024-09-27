import express from "express";
import {
  getHomePage,
  getUserPage,
  postCreateUser,
  handleDeleteUser,
} from "../controller/homeController";

const router = express.Router();

router.get("/", getHomePage);
router.get("/user", getUserPage);
router.post("/user/create-user", postCreateUser);
router.post("/delete-user/:id", handleDeleteUser);
module.exports = router;
