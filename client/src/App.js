import React, { useEffect, useState } from "react";
import "./App.css";

// frontend set up from: https://www.youtube.com/watch?v=w3vs4a03y3I
function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  async function fetchMovies() {
    const res = await fetch(
      `http://localhost:5000/api/movies?query=${query}&sort=${sort}&page=${currentPage}`
    );
    const data = await res.json();
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  }

    function handleSearchChange(e) {
    setQuery(e.target.value);
    setCurrentPage(1);
  }

  function handleSortChange(e) {
    setSort(e.target.value);
    setCurrentPage(1);
  }

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    fetchMovies();
  }, [query, sort, currentPage]);

  return (
    <div>
      <h1 className="title">Movie Explorer</h1>

      <div className="search">
        <input 
          className="search-query"
          type="search" 
          placeholder="Search movies..."
          value={query}
          onChange={handleSearchChange}
        />

        <select 
          className="sort-dropdown"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="release_date.asc">Release Date (Asc)</option>
          <option value="release_date.desc">Release Date (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
        </select>
      </div>

      <div className="movie-container">
        {movies.length === 0 && <p>No movies found.</p>}

        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
              <div className="no-image">{movie.title}</div>
            )}
            <h3>{movie.title}</h3>
            <div className="card-info">
              <p>Release: {movie.release_date || "N/A"}</p>
              <p>Rating: {movie.vote_average || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="prev-btn"
          onClick={handlePrevPage}
        >
          Previous
        </button>

        <span className="page-info">Page {currentPage} of {totalPages}</span>

        <button
          className="next-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App