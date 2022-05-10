import React, { useEffect, useState } from "react";
import "./Banner.css"
import axios from "./axios";
import requests from "./requests";

function Banner() {
  const [movie, setMovie] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";

  const truncate =(str, n)=>{
      return str?.length>n?str.substr(0,n-1)+"...":str;
  }   

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${baseURL}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">{truncate(movie?.overview,150)}</h2>
      </div>
      <div className="banner--fadebottom"/>
    </header>
  );
}

export default Banner;
