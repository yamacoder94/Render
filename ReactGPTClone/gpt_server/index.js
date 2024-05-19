import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
//import {fileURLToPath} from "url";
//import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
  modelPath: path.join(__dirname, "models", "codellama-13b.Q3_K_M.gguf"),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context }); //what is needed to ask any question to the llama model

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
