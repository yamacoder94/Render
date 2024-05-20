const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(8080, () => console.log("Server ready on port 8080."));

module.exports = app;

// import path from "node:path";
// import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// // Initialize the Llama model
// const modelPath = path.join(
//   __dirname,
//   "..",
//   "models",
//   "notus-7b-v1.Q4_K_M.gguf"
// );
// const model = new LlamaModel({ modelPath });
// const context = new LlamaContext({ model });
// const session = new LlamaChatSession({ context });

// // Export the function to handle socket.io connections
// export default async (req, res) => {
//   if (req.method === "POST") {
//     // Handle incoming messages
//     const msg = req.body.message;

//     try {
//       // Process the message using the Llama model
//       const bot_reply = await session.prompt(msg);
//       return res.status(200).json({ response: bot_reply });
//     } catch (error) {
//       console.error("Error processing message:", error);
//       return res.status(500).json({ error: "An error occurred." });
//     }
//   }

//   return res.status(405).end(); // Method Not Allowed
// };
