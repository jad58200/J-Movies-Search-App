import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import "./styles/App.css";
import "./styles/components.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const fetchMovies = async (title) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies("the last of us");
  }, []);

  return (
<Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={fetchMovies} />
                {loading && <p className="message">Loading movies...</p>}
                {error && <p className="message error">{error}</p>}
                <div className="movies-grid">
                  {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>

        <footer className="app-footer">
        By Eng. Jad Kamal Alromhein
      </footer>
      
      </div>
    </Router>
  );
};

export default App;
