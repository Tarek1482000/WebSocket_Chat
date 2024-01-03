const express = require("express");
const cors = require("cors");
const http = require("http");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5501",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected with socket id: ", socket.id);
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("send message to all ", msg);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("show_typing_status");
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("clear_typing_status");
  });

  socket.on("disconnect", () => {
    console.log("left the chat " + socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server Started");
});
