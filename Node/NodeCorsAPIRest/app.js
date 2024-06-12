const express = require("express");
const app = express();
const movies = require("./movies.json");
const crypto = require("node:crypto"); //nos permite crear IDs
const z = require("zod");
app.use(express.json()); // Middleware ,necesario para formatear ? la informacion que se envvia en el post, put, patch
app.disable("x-powered-by");

// app.get("/", (req, res) => {
//   res.json({ message: "Hola desde express ... FOO" });
//   //esto marca que la respuesta es en formatoo JSON
// });

//trae todas las peliculas
//Se agrego la capcidad de traer por filtro desde aca

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

//trae pelicula por id
//path to regexp
//esta es la que solia usuar React Router

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  //en caso que no la encuentre
  res.status(404).json({ message: "Movie not Found" });
});

//Crea una pelicula nueva
app.post("/movies", (req, res) => {
  const { title, genre, year, director, duration, rate, poster } = req.body;

  const newMovie = {
    id: crypto.randomUUID(), //esto puede correr en la consola del navegador
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0, // hace que el rate sea opcional
    poster: poster ?? 0,
  };

  movies.push(newMovie);

  //se necesita especificar el codigo de respuesta
  //201 por que se creo algo en el servidor
  res.status(201).json(newMovie); //actuliza la cache
});

// app.use((req, res) => {
//   res.status(404).send("<h1>404 ERROR you FOO</h1>");
// });

const PORT = process.env.PORT ?? 1235;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
