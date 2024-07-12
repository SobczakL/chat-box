import io from "socket.io-client";
const socket = io("http://localhost:8080");

const button = document.getElementById("main-button");
const input = document.getElementById("main-input");

button.addEventListener("click", () => {
  if (!input.value) {
    return;
  }
  socket.emit("message", input.value);
  input.value = "";
});

socket.on("welcome", (message) => {
  console.log(message);
});
socket.on("receiveMessage", (message) => {
  console.log(message);
});
