//nos dara un puerto disponible
const net = require("node:net");

function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer(); // esto crea el servidor

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port); // en caso que haya podido levantar en el puerto deseado , pues lo hace
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findAvailablePort(0).then((port) => resolve(port));
        //si falla , le pasamos el parametro 0 y asi nos busca un puerto disponible
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { findAvailablePort };
