import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga el modelo
const model = new LlamaModel({
  modelPath: path.join(__dirname, "models", "notus-7b-v1.Q4_K_M.gguf"),
});
//contexto
const context = new LlamaContext({ model });
//crea la session del modelo , cargando el contexto
const session = new LlamaChatSession({ context });

//Se crea el servidor
const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, "dist")));

//de tipo socket
//io es igual a un nuevo objeto de tipo server(http??)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Se hace la conexion de io
io.on("connection", (soc) => {
  console.log("There is a new connection");
  soc.on("message", async (msg) => {
    console.time("prompt-response-time"); // Start timing
    console.log(`Received message: ${msg}`);

    try {
      //respuesta del robot , que llama a un objeto de tipo sessin (const session = new LlamaChatSession({ context });)
      const bot_reply = await session.prompt(msg);
      //emite ? la respuesta del robot
      soc.emit("response", bot_reply);
      console.log(`Sent response: ${bot_reply}`);
    } catch (error) {
      console.error("Error processing message:", error);
      soc.emit("response", "Sorry, an error occurred.");
    }

    console.timeEnd("prompt-response-time"); // End timing
  });
});

//crea el servicio en el puerto 8080
const PORT = process.env.PORT || 8080;

//server de tipo http , esta constantemente escuchando que esta en el puerto designado (8080)
server.listen(PORT, () => {
  console.log("Server started on port %d", PORT);
});
