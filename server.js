const express = require("express");
const app = express();
// Creating Server
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Server Started on Port no. ${PORT}`));
app.use(express.static(__dirname + "/Public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// Import Socket
const io = require("socket.io")(http);
// Socket Setup
io.on("connection", (socket) => {
  console.log("Socket Connected.........");
  socket.on("message", (msg) => socket.broadcast.emit("message", msg));
});
