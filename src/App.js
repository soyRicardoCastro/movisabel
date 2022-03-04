import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import SearchIcon from './search.svg'
import './App.css'

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=10e94bcd"
// http://www.omdbapi.com/?i=tt3896198&apikey=10e94bcd

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Flash");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovIsabel</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca tu Pelicula"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, i) => (
            <MovieCard movie={movie} key={i} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No encontré tu pelicula amor {":("}</h2>
        </div>
      )}
    </div>
  )
}

export default App
