const fs = require("node:fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.error("Error al leer el directoruio:", err);
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});

//el call back ya nos esta dando el try catch en el parametro
