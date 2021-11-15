require("dotenv").config();

async function searchListener() {
  const searchInputField = document.querySelector("#search_input");
  searchInputField.addEventListener("keyup", async (evt) => {
    if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
      return;
    }
    evt.preventDefault();
    const movieResults = await fetchSearch(search_input.value);
    clearMovieList();
    createMovieList(movieResults);
    addClickListener();
  });
}

async function fetchSearch(searchInput) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=`;
  const data = await fetch(`${searchUrl} + ${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
  return data;
}

function clearMovieList() {
  const listResults = document.querySelector("#results");
  listResults.innerHTML = "";
}

function createMovieList(movieSearchResults) {
  const listResults = document.querySelector("#results");
  movieSearchResults.slice(0, 10).forEach((result) => {
    const movie = `
    <a href="./movies" class='move'>
      <li class="list-inline-item li" tabindex="-1"
        data-name="${result.original_title}"
        data-release_date="${result.release_date}"
        data-overview="${result.overview}"
        data-vote_average="${result.vote_average}"
        data-genre="[${result.genre_ids}]"
        data-img="${result.poster_path}"
        data-backdrop_img="${result.backdrop_path}">
        <p">${result.original_title}</p>
      </li>
      </a>`;
    listResults.insertAdjacentHTML("beforeend", movie);
  });
  addKeyboardAccess();
}

async function addClickListener() {
  const itemsClick = document.querySelectorAll(".li");
  const itemsKey = document.querySelectorAll("a");
  itemsClick.forEach((item) => {
    item.addEventListener("click", async (evt) => {
      evt.preventDefault();
      innerListener(evt.currentTarget);
    });
  });
  itemsKey.forEach((item) => {
    item.addEventListener("keydown", async (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        innerListener(evt.target.querySelector("li"));
      }
    });
  });
}

async function innerListener(evt) {
  sessionStorage.clear();
  const movieData = await createMovieObject(evt);
  sessionStorage.setItem("movieData", JSON.stringify(movieData));
  clearMovieList();
  switchToSearch();
}

async function fetchMovieGenres(genreIds) {
  const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const data = await fetch(genreURL)
    .then((response) => response.json())
    .then((data) => {
      return genreIds.map((genreId) => data.genres.find((x) => x.id === genreId).name);
    });
  return data;
}

async function createMovieObject(clickedItem) {
  const fn = (data) => $(clickedItem).data(data);
  const genre = await fetchMovieGenres($(clickedItem).data("genre"));
  sessionStorage.setItem("name", fn("name"));
  const movieObj = {
    name: fn("name"),
    release_date: fn("release_date"),
    overview: fn("overview"),
    vote_average: fn("vote_average"),
    genre: genre,
    img: fn("img"),
    imgBackdrop: fn("backdrop_img"),
  };
  return movieObj;
}

function addKeyboardAccess() {
  var listItems = document.getElementsByClassName("move");

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener(
      "keydown",
      function (event) {
        if (event.key === "ArrowUp") {
          if (this.previousElementSibling) {
            this.previousElementSibling.focus();
          }
        } else if (event.key === "ArrowDown") {
          if (this.nextElementSibling) {
            this.nextElementSibling.focus();
          }
        }
      },
      false
    );
    listItems[i].addEventListener(
      "mouseover",
      function () {
        this.focus();
      },
      false
    );
  }
}

function switchToSearch() {
  window.location.href = "./movies";
}

export { searchListener };
