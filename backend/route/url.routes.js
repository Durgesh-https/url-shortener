import express from "express";
import { shorten } from "../controller/Url.controllers.js";

const router = express.Router();

router.post("/shorten", shorten);

export default router;
