import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  const userid = socket.handshake.query.userId;
  if (userid) {
    users[userid] = socket.id;
    console.log("Users: ", users);
  }
  io.emit("getonline", Object.keys(users));
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    delete users[userid];
    io.emit("getonline", Object.keys(users));
  });
});

export { app, io, server };
