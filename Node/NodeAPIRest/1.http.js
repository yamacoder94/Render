const http = require("node:http");

const desiredPort = process.env.PORT ?? 1234;

//call back : cada vez que se reciba un request , ejecutara algo
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log("request recieved");
  res.end("Hola Mundo");
});

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});

//por que me llegan los dos requests ?
