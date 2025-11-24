import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${id}&plot=full`);
        const data = await response.json();
        if (data.Response === "True") setMovie(data);
        else setError("Movie details not found.");
      } catch (err) {
        setError("Failed to fetch movie details.");
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="message">Loading details...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
          alt={movie.Title}
        />
        <div className="details-text">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
