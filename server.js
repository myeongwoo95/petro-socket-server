const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8000 });

function disconnectSocket(ws) {
  try {
    wss.clients.forEach((socket) => {
      if (ws === socket) ws.close();
    });
  } catch (error) {
    console.error(error);
  }
}

wss.on("connection", (ws, request) => {
  const serial = new URLSearchParams(request.url.split("?")[1]).get("serial");

  if (!serial) {
    ws.close();
    return;
  }
  ws["channel"] = serial;
  setTimeout(disconnectSocket, 600000, ws);

  ws.on("message", (msg) => {
    try {
      wss.clients.forEach((socket) => {
        if (socket.channel === ws.channel && ws !== socket) {
          socket.send(msg.toString());
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
});
