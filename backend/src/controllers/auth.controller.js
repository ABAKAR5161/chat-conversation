import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { config } from "dotenv";
import User from "../models/auth.model.js";
config();

const formatAuthUser = (user) => ({
    _id: user._id,
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
});

export const signup = async (req, res) => {
    try {
        const { userName, fullName, email, password, confirmPassword, gender } = req.body;

        if (!userName || !fullName || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All filts must be required." });
        };

        if (!["male", "female"].includes(gender)) {
            return res.status(400).json({ message: "Gender must be male or female." });
        }
        
        if (password.length < 8 || password !== confirmPassword) {
            return res.status(400).json({ message: "Password must be at least 8 characters and confirmPassword must match password" });
        };
        
        const cleanUserName = userName.trim();
        const cleanFullName = fullName.trim();
        const cleanEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User exist, please try to loging." });
        }
        const salt = await bcrypt.genSalt(10);
        const isHashPassword = await bcrypt.hash(password, salt);
        const isHashConfirmPassword = await bcrypt.hash(password, salt);
        const newUser =  new User({
            userName: cleanUserName,
            fullName: cleanFullName,
            email: cleanEmail,
            password: isHashPassword,
            confirmPassword: isHashConfirmPassword,
            gender,
        });
        await newUser.save();
        generateToken(newUser._id, res);
        return res.status(201).json({
            message: "User signup successfull!",
            authUser: formatAuthUser(newUser),
        });

    } catch (error) {
        console.log("Error in signup controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
    
};

export const logging = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fielts are provider." });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        const cleanEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: cleanEmail });
        if (!existingUser) {
            return res.status(400).json({ message: "Credential Error" });
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(200).json({ message: "Credential Error" });
        }
        generateToken(existingUser._id, res);
        return res.status(200).json({
            message: "User loging success!",
            authUser: formatAuthUser(existingUser),
        });
    } catch (error) {
        console.log("Error in loging controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (_, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful!"
        });
    } catch (error) {
        console.log("Error in logout controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

