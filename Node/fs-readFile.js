const fs = require("node:fs");

const text = fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log("primer texto:", text); //luego esto hasta que termina de cargar , es decir l deja en una cola
});
//no me esperes y sigue ejecutando esto :

console.log("hace cosas mientras lee el archivo"); //esto se  imprime primero

//que pasa con las promesas
