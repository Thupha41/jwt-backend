import express from "express";
import { getHomePage } from "../controller/homeController";

const router = express.Router();

router.get("/", getHomePage);

module.exports = router;
