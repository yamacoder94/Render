// const express = require("express");
// const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(8080, () => console.log("Server ready on port 8080."));

// module.exports = app;

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import path from "node:path";
// import { fileURLToPath } from "url";
// // import cors from "cors";

// import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const model = new LlamaModel({
//   modelPath: path.join(__dirname, "models", "notus-7b-v1.Q4_K_M.gguf"),
// });
// const context = new LlamaContext({ model });
// const session = new LlamaChatSession({ context }); //what is needed to ask any question to the llama model

const app = express();
const server = createServer(app); // Pass the app to the server

const io = new Server(server);

const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log("Server started on port %d", PORT);
});
