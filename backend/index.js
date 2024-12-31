import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./Route/user.route.js";
import messageRoute from "./Route/message_route.js";

import { app, server } from "./Socketio/server.js";

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 5001;

const URI = process.env.MONGODB_URI;
try {
  mongoose.connect(URI);
  console.log("MONGODB is Connected");
} catch (error) {
  console.log(error);
}

app.use("/api/user", router);
app.use("/api/message", messageRoute);
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
