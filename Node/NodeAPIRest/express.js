const express = require("express");
const app = express();
const ditto = require("./pokemon/ditto.json"); //se necesita para poder hacer el get

app.disable("x-powered-by");
const PORT = process.env.PORT ?? 1234;

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>Mi pagina con express </h1>");
// });

// app.post("/pokemon", (res, req) => {
//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     const data = JSON.parse(body);

//     data.timestamp = Date.now();
//     res.status(201).json(data);
//   });
// });

app.use(express.json());

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  // req.body deberíamos guardar en bbdd
  res.status(201).json(req.body);
});

// la última a la que va a llegar
//tiene que ser la ultima
//tiene que responder en este orden
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

//justo como en Node JS
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
