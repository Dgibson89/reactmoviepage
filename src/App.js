import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=78c6515a";

const movie1 = {
  Title: "The Cabin in the Woods",
  Year: "2011",
  imdbID: "tt1259521",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  const serachMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    serachMovies("Cabin in the woods");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => serachMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
