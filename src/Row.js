import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, fetchURL, isBackdrop }) {
  const [movies, SetMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      // console.table(request.data.results);
      SetMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, i) => (
          <div key={i} className={`row__movie ${isBackdrop && "row__movie_backdrop"}`}>
            <img
              key={movie.id}
              className="row__poster"
              src={`${baseURL}${
                isBackdrop ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.title || movie.name}
              loading="lazy"
            />
            <h1>{movie.title || movie.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
