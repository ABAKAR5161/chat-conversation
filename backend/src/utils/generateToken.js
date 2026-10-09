import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (userId, res) => {
    // Create token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24 * 15 // 15 days before expired
        }
    );
    // Stored token to cookies
    return res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        
    });
}
export default generateToken;