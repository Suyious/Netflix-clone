import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

function Row({ title, fetchURL, isBackdrop }) {
  const [movies, SetMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("");
  const baseURL = "https://image.tmdb.org/t/p/original/";


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      console.table(request.data.results);
      SetMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick=(movie)=>{
    if (trailerUrl){
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
      .then((url)=>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error)=>console.log(error));
    }
  }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div className={`row__movie ${isBackdrop && "row__movie_backdrop"}`}>
            <img
              key={movie.id}
              className="row__poster"
              onClick={()=> handleClick(movie)}
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
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
