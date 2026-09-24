import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        select: false,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;