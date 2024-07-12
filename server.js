import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const options = {
  cors: true,
  origin: ["http://localhost:8080"],
};

const server = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

const io = new Server(server, options);

app.use(express.static("./dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to the server");
  socket.join("room1");
  socket.on("message", (message) => {
    io.to("room1").emit("receiveMessage", message);
  });
});
