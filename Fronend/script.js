// Establish WebSocket connection to the Socket.IO server
const socket = io("http://localhost:3000");

// Get references to HTML elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const typingStatus = document.getElementById("typing_status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});

socket.on("Send message to all", (msg) => {
  console.log("send message to all ", msg);
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, messages.scrollHeight);
  // window.scrollTo(0, document.body.scrollHeight);
});

input.addEventListener("keyup", () => {
  socket.emit("typing");
});

input.addEventListener("keydown", () => {
  socket.emit("stop_typing");
});

socket.on("show_typing_status", () => {
  typingStatus.innerHTML = "Client is typing ..";
});

socket.on("clear_typing_status", () => {
  setTimeout(() => {
    typingStatus.innerHTML = "";
  }, 2000);
});
