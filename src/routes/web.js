import express from "express";
import { getHomePage, getUserPage } from "../controller/homeController";

const router = express.Router();

router.get("/", getHomePage);
router.get("/user", getUserPage);
module.exports = router;
