const fs = require("node:fs/promises"); //trnasforma esto ara que en lugar de call backs sean promersas

console.log("leyendo el archivo");
fs.readFile("./archivo.txt", "utf-8").then((text) => {
  console.log("primer texto:", text);
});

console.log("hace cosas mientras lee el archivo");
