//otro nativo
//
//nos dra informacion sobre donde tenwmmo los archivos
const path = require("node:path");

//unir rutas con path.join
// -> unix /
// -> windows \
console.log(path.sep);

//unir rutas
const filePath = path.join("content", "subFolder", "test.text");
console.log(filePath);

//este nos regresa el nombre del fichero
const base = path.basename("/tmp/midu-secret-files/password.txt");
console.log(base);

//nombre del archivo sin la extension
const fileName = path.basename("/tmp/midu-secret-files/password.txt", ".txt");
console.log(fileName);
//password.txt
//password

const extension = path.extname("image.jpg");
console.log(extension);
//.jpg retorna el valor de la extension
