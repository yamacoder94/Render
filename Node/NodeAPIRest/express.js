const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Mi pagina con express </h1>");
});

//justo como en Node JS
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
