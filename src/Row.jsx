import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, fetchURL, isBackdrop }) {
  const [movies, SetMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      console.log(request.data.results);
      SetMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const Star = ({rating}) => {
    if(rating <= 5){
      return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.995 275.8 .0131 287.1-.0391L288 439.8zM433.2 512C432.1 512.1 431 512.1 429.9 512H433.2z"/></svg>
      )
    } else if(rating > 5 && rating <= 8){
      return (
        <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M159.8 508.3L288.1 439.8L381.2 489.468V150.3L316.9 17.97C311.6 6.95404 300.4 -0.0390625 288.1 -0.0390625C275.9 -0.0390625 264.7 6.95404 259.4 17.97L195 150.3L51.42 171.5C39.43 173.2 29.46 181.6 25.69 193.1C21.91 204.7 24.97 217.3 33.58 225.9L137.8 328.1L113.2 474.7C111.1 486.7 116.1 498.9 126 506C135.9 513.1 149 514 159.8 508.3Z"/></svg>
      )
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
      )
    }
  }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, i) => (
          <div key={i} className={`row__movie ${isBackdrop?"row__movie_backdrop":"row__movie_normal"}`}>
            <img
              key={movie.id}
              className="row__poster"
              src={`${baseURL}${
                isBackdrop ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.title || movie.name}
              loading="lazy"
            />
            <h1 className="row__movie_title">{movie.title || movie.name}</h1>
            <h1 className="row__movie_rating"><Star rating={movie.vote_average}/>{movie.vote_average}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
