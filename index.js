import { starIcon } from "./data/icons.js";

const API_KEY = "04c35731a5ee918f014970082a0088b1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&page=1&query=`;
const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
const UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`;
const TOPRANKED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(POPULAR_API);

const populars = document.getElementById("populars");
const latests = document.getElementById("latests");
const topranked = document.getElementById("topranked");
const sections = [populars, latests, topranked];

sections.forEach((section) => {
  section.addEventListener("click", (e) => {
    e.preventDefault();
    if (section === populars) {
      getMovies(POPULAR_API);
      return;
    }
    if (section === latests) {
      getMovies(UPCOMING_API);
      return;
    }
    if (section === topranked) {
      getMovies(TOPRANKED_API);
      return;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;

  if (searchValue) {
    getMovies(SEARCH_API + searchValue);
    search.value = "";
  }
});

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);
    showMovies(data.results);
  } catch {
    showError404();
  }
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");
    movieContainer.innerHTML = `
            <div class="movie-card">
                <img src="${IMG_PATH + movie.poster_path}"/>
                <div class="overview">
                    <h4>Overview:</h4>
                    ${movie.overview}
                </div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(movie.vote_average)}">
                    ${movie.vote_average}
                    ${starIcon}
                </span>
            </div>
        `;
    main.appendChild(movieContainer);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showError404(){
  main.innerHTML = "";
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error404");
    errorContainer.innerHTML = `
            <h1>ERROR 404</h1>
            <h2>Puede deberse a un problema con el servidor</h2>
            <img src="./img/error404.png">
        `;
    main.appendChild(errorContainer);
}
