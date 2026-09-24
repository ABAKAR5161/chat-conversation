
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

config();

export async function protectRoute(req, res, next) {
    try {
        let token = req.cookies?.jwt;

        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token " });
        }

        console.log("Error in protectRoute middleware", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}