import { starIcon } from "./data/icons.js";

const API_KEY = "04c35731a5ee918f014970082a0088b1"; // https://github.com/florinpop17/10-projects-10-hours/blob/master/movie-app/script.js
const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&page=1&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(POPULAR_API);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;

  if (searchValue) {
    getMovies(SEARCH_API + searchValue);
    search.value = "";
  }
});

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
