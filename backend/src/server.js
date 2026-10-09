import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js"
import connectDB from "./confid/db.js";
import { app, server } from "./socket/socket.js";

const PORT = 5000;
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
  });
};

startServer();

