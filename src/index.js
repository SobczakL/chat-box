import io from "socket.io-client";
const socket = io("http://localhost:8080");

const button = document.getElementById("send");
const input = document.getElementById("input");

let userId;

button.addEventListener("click", () => {
  if (!input.value) {
    return;
  }
  socket.emit("message", input.value);
  input.value = "";
});

socket.on("welcome", id => {
  userId = id;
});
socket.on("receiveMessage", response => {
  const isOur = response.userId === userId;

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("messageContainer");
  if(!isOur){
    messageContainer.classList.add("left"); 
  }
  const innerMessage = document.createElement("div");
  innerMessage.classList.add("message");
  if(!isOur){
    innerMessage.classList.add("foreign")
  }
  const messageInfo = document.createElement("div");
  messageInfo.classList.add("messageInfo");
  const username = document.createElement("p");
  username.classList.add("username");
  username.innerText = "Jake";
  const date = document.createElement("p");
  date.classList.add("date");
  date.innerText = new Date();
  const textContainer = document.createElement("div");
  textContainer.classList.add("textContainer");
  const textParagraph = document.createElement("div");
  textParagraph.innerText = response.message;

  messageContainer.appendChild(innerMessage);
  innerMessage.appendChild(messageInfo);
  messageInfo.appendChild(username);
  messageInfo.appendChild(date);
  innerMessage.appendChild(textContainer);
  textContainer.appendChild(textParagraph);

  const mainMessageContainer = document.getElementsByClassName("messages")[0];
  mainMessageContainer.appendChild(messageContainer);

  console.log(message);
});
