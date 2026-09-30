import express from "express";
import { checkAuth, getUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router()
router.get("/", protectRoute, getUsers);
router.get("/checkAuth", protectRoute, checkAuth);
export default router;