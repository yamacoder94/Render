import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import path from "node:path";
// import { fileURLToPath } from "url";
// import cors from "cors";

//import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const model = new LlamaModel({
//   modelPath: path.join(__dirname, "models", "notus-7b-v1.Q4_K_M.gguf"),
// });
// const context = new LlamaContext({ model });
// const session = new LlamaChatSession({ context }); //what is needed to ask any question to the llama model

const app = express();
const server = createServer(app); // Pass the app to the server

//creating the server
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });
const io = new Server(server);

// io.on("connection", (soc) => {
//   console.log("There is a new connection");
//   soc.on("message", async (msg) => {
//     console.time("prompt-response-time"); // Start timing
//     console.log(`Received message: ${msg}`);

//     try {
//       const bot_reply = await session.prompt(msg);
//       soc.emit("response", bot_reply);
//       console.log(`Sent response: ${bot_reply}`);
//     } catch (error) {
//       console.error("Error processing message:", error);
//       soc.emit("response", "Sorry, an error occurred.");
//     }

//     console.timeEnd("prompt-response-time"); // End timing
//   });
// });

//const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log("Server started on port %d", PORT);
});
