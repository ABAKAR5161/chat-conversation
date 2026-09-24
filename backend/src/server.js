import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js"
import connectDB from "./confid/db.js";
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
  });
};

startServer();

