const express = require("express");
const app = express();

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hola desde express ... FOO" });
  //esto marca que la respuesta es en formatoo JSON
});

const PORT = process.env.PORT ?? 1235;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
