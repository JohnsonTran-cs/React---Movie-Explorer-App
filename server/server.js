//backend setup from: https://www.youtube.com/watch?v=w3vs4a03y3I
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express()
app.use(cors());

app.get("/api/movies", async (req, res) => {
    const query = req.query.query || ""; 
    const sort_by = req.query.sort || "popularity.desc";
    const page = req.query.page || 1;
    const TMDB_KEY = process.env.TMDB_KEY;
    const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&sort_by=${sort_by}&page=${page}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "TMDB fetch failed" });
  }
});

app.listen(5000, () => { console.log("Server started on port 5000")})