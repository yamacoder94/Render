import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);

const PORT = process.env.PORT || 8080;

// app.get("/test", (_, res) => {
//   res.send("This is a test");
// });

server.listen(PORT, () => {
  console.log("Server started on port %d", PORT);
});
