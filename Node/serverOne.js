const http = require("node:http");
//permite crear un servidor http
const { findAvailablePort } = require("./serverTwo");
//ahora podmeos llamar a la funcion que creamos que nos busca un pueerto disponible

const desiredPort = process.env.PORT ?? 3000; // nos permite colocar un puerto predeterminado
//desde la linea de comando para arrancar el servidor

const server = http.createServer((req, res) => {
  console.log("request recieved");
  res.end("Hola Mundo");
});
//req es el request y res es la respuesta

//una vez que ya tenemos el servidor , ahora tenemos que crear lo q hara con ese request
// server.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

// server.listen(0, () => {
//   console.log(
//     `Server listening on port http://localhost:${server.address().port}`
//   );
// });

//si se asigna el puerto 0 , utilizara el primer puerto que esta disponible

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
