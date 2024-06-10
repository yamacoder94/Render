//el objeto process
// brinda informacion sobre el proceso actual en ejecucion
//argumeentos

console.log(process.argv);
//(process.argv); son los argumentos que se reciben en la linea de comando
//tambien se puede controlar el proceso

process.exit(1);
// en caso que se retorne 1 , se sale

process.on("exit", () => {
  //limipiar los recursos
});

//current workiung directory
console.log(process.cwd());

//variables de entorno
console.log(process.env.NODE_ENV);
