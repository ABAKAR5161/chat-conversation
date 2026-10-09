import express from "express";
import { checkAuth, getUsers } from "../controllers/user.controller.js";
import { optionalProtectRoute, protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router()
router.get("/", protectRoute, getUsers);
router.get("/checkAuth", optionalProtectRoute, checkAuth);
export default router;