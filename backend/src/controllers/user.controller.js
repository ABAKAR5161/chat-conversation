import User from "../models/auth.model.js";

export async function getUsers(req, res) {
    try {
        const { _id: userId } = req.user;
        const filterUsers = await User.find({ _id: { $ne: userId } }).select("-password");
        return res.status(200).json(filterUsers);   
    } catch (error) {
        console.log("Error in getUsers controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
};

export const checkAuth = async (req, res) => {
    return res.status(200).json({ authUser: req.user });
};