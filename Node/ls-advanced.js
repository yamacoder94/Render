const fs = require("node:fs/promises");

const folder = process.argv[2] ?? ".";

fs.readdir(folder)
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    if (err) {
      console.error("Error al leer el directorio:", err);
      return;
    }
  });

//con esto ahora pdoemos tener mas informacion sobre los directorios
// aca vemos un claro ejemplo de como manejar el error
