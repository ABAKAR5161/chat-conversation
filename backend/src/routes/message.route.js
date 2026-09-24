import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send/:userId", protectRoute, sendMessage);
router.get("/:userId", protectRoute, getMessages);
export default router;