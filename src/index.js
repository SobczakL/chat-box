import io from "socket.io-client";
const socket = io("http://localhost:8080");

const button = document.getElementById("main-button");
const input = document.getElementById("main-input");

button.addEventListener("click", (e) => {
  socket.emit("msg", input.value);
});
