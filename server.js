const WebSocket = require("ws");
require("dotenv").config();

const port = process.env.PORT || 5000;

const server = new WebSocket.Server({ port });

let clients = [];

server.on("connection", (ws) => {
  console.log("Client connected");
  clients.push(ws);

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Send to all OTHER clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
        console.log("message sent : ", message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
    console.log("Client disconnected");
  });
});

console.log(`Server running on port ${port}`);
