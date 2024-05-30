//utiliza el file system
const fs = require("node:fs"); //esto es como un import

//esto es sincrono
const stats = fs.statSync("./archivo.txt");
console.log(
  stats.isFile(), //si es un fichero
  stats.isDirectory(), //si es un directorio
  stats.isSymbolicLink(), //si es un enlace simbolico
  stats.size
);
