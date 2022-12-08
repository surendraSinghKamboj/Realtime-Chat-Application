const socket = io();
let name;
let input = document.querySelector("#message");
let messageArea = document.querySelector(".msgarea");

do {
  name = prompt("Enter Username");
} while (!name);

input.addEventListener("keyup", (key) => {
  if (key.key == "Enter") {
    sendMessage(key.target.value);
  }
});

const sendMessage = (message) => {
  let msg = {
    user: name,
    message: message,
  };
  // Adding in message area
  appendMessage(msg, "sent");
  input.value = "";
  autoScroll();

  // Send to Server
  socket.emit("message", msg);
};

const appendMessage = (msg, type) => {
  let msgDiv = document.createElement("div");
  msgDiv.classList.add(type);
  let content = `<span>${msg.message}</span>`;
  msgDiv.innerHTML = content;
  messageArea.appendChild(msgDiv);
};

socket.on("message", (msg) => {
  appendMessage(msg, "recived");
  autoScroll();
});

const autoScroll = () => (messageArea.scrollTop = messageArea.scrollHeight);
