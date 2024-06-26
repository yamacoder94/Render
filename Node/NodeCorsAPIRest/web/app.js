const express = require("express");
const app = express();

const cors = require("cors"); // por defecto deja pasar todo
const movies = require("./movies.json");
const crypto = require("node:crypto"); //nos permite crear IDs
const { validateMovie, validatePartialMovie } = require("../schemas/movies");

app.use(express.json()); // Middleware ,necesario para formatear ? la informacion que se envvia en el post, put, patch
//de esta forma se especifica que se permitira con CORS
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080", //ejemplo
        "http://localhost:1235",
        "https://movies.com", //ejemplo
        "https://midu.dev", //ejemplo
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

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
  //   const { title, genre, year, director, duration, rate, poster } = req.body;

  //   const newMovie = {
  //     id: crypto.randomUUID(), //esto puede correr en la consola del navegador
  //     title,
  //     genre,
  //     year,
  //     director,
  //     duration,
  //     rate: rate ?? 0, // hace que el rate sea opcional
  //     poster: poster ?? 0,
  //   };

  //   movies.push(newMovie);

  //   //se necesita especificar el codigo de respuesta
  //   //201 por que se creo algo en el servidor
  //   res.status(201).json(newMovie); //actuliza la cache

  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    //el servidor a entendido el req pero la sintaxis esta fallida
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos, crea un ID aleatorio
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

//Elimina pelicula
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

// app.use((req, res) => {
//   res.status(404).send("<h1>404 ERROR you FOO</h1>");
// });

const PORT = process.env.PORT ?? 1235;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
