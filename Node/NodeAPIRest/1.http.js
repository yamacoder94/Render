const http = require("node:http");
const fs = require("node:fs");
const desiredPort = process.env.PORT ?? 1234;

//esto lo que hace cuando llega el request
const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200;
    //Esto seria la pagina de inicio

    // console.log("request recieved: ", req.url);
    //"Content-Type", "text/html; charset=utf-8"
    //"Content-Type" indicara el tipo de contenido
    //"text/html puede ser plain tambien , esto nos dice si lo que pasara es un doc html o texto plano
    //charset=utf-8 codificacion , ideal si en la pagina se usa puntuacion como asentos
    res.end("Bienvenido a mi pagina");
  } else if (req.url === "/contact") {
    //esta seria pagina contact
    res.statusCode = 200; // esto es por defecto , por lo que no es necesario agregarlo

    res.end("<h1>Contactos</h1>");
  } else if (req.url === "/imagen") {
    fs.readFile("./yambete.jpg", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>500 internal error</h1>");
      } else {
        res.setHeader("Content-Type", "image/jpg");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404; // nor found
    res.end("<h1>Error 404</h1>");
  }
};

//esto seria el request
//call back : cada vez que se reciba un request , ejecutara algo
const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});

//por que me llegan los dos requests ?
//usar node --watch
//para poder ir actulizando el codigo del servidor sin tener q bajarlo
