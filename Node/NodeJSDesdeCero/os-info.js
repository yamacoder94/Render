//globalThis.console.log("Hola, mundo");

const os = require("node:os"); // bridna informacion sobre el sistema operativo
console.log("la informacion de nuestro sistema operativo:");
console.log("------------------------------------");
console.log("Nombre del sistema operativo", os.platform());
console.log("version del sistema operativo", os.release());
console.log("Arquitectura del sistema operativo", os.arch());
console.log("CPUS del sistema operativo", os.cpus()); //<---- vamos a poder escalar procesos en node
console.log(
  "Memoeria libre  del sistema operativo",
  os.freemem() / 1024 / 1024
); //<---- vamos a poder escalar procesos en node
console.log(
  "Memoeria total del sistema operativo",
  os.totalmem() / 1024 / 1024
); //<---- vamos a poder escalar procesos en node

console.log("uptime", os.uptime() / 60 / 60); //nos dice el tiempo que el ordenador lleva encendido
