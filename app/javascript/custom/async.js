require("dotenv").config();

const dateFormater = (dateString) => {
  return [Number(dateString.substring(0, 4)), Number(dateString.substring(5, 7)), Number(dateString.substring(8, 10))];
};

async function fetchMovieGenres(genreIds) {
  const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const data = await fetch(genreURL)
    .then((response) => response.json())
    .then((data) => {
      return genreIds.map((genreId) => data.genres.find((x) => x.id === genreId).name);
    });
  return data;
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

async function createMovieObject(clickedItem) {
  const fn = (data) => $(clickedItem).data(data);
  const genre = await fetchMovieGenres($(clickedItem).data("genre"));
  sessionStorage.setItem("name", fn("name"));
  const movieObj = {
    name: fn("name"),
    release_date: fn("release_date"),
    genre: genre,
    img: fn("img"),
  };
  return movieObj;
}

const createMovieList = (movieSearchResults) => {
  const listResults = document.querySelector("#results");
  movieSearchResults.slice(0, 10).forEach((result) => {
    const movie = `
    <a href="./movies" class='move'>
      <li class="list-inline-item li" tabindex="-1"
        data-name="${result.original_title}"
        data-release_date="${result.release_date}"
        data-genre="[${result.genre_ids}]"
        data-img="${result.poster_path}">
        <p">${result.original_title}</p>
      </li>
      </a>`;
    listResults.insertAdjacentHTML("beforeend", movie);
  });
  addKeyboardAccess();
};

function addKeyboardAccess() {
  var listItems = document.getElementsByClassName("move");

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener(
      "keyup",
      function (event) {
        if (event.key === "ArrowUp") {
          console.log(listItems[i]);
          if (this.previousElementSibling) {
            this.previousElementSibling.focus();
          }
        } else if (event.key === "ArrowDown") {
          console.log(listItems[i]);
          if (this.nextElementSibling) {
            this.nextElementSibling.focus();
          }
        }
      },
      false
    );
    listItems[i].addEventListener(
      "mouseover",
      function (event) {
        console.log(listItems[i]);
        this.focus();
      },
      false
    );
  }
}

function clearMovieList() {
  const listResults = document.querySelector("#results");
  listResults.innerHTML = "";
}

async function fillMovieForm(movieData) {
  // form input getters
  const movieNameInput = document.getElementById("movie_name");
  const movieReleaseDateYear = document.getElementById("movie_release_date_1i");
  const movieReleaseDateMonth = document.getElementById("movie_release_date_2i");
  const movieReleaseDateDay = document.getElementById("movie_release_date_3i");
  const movieGenre = document.getElementById("movie_genre");

  // form input setters
  movieNameInput.value = movieData.name; //done
  [movieReleaseDateYear.value, movieReleaseDateMonth.value, movieReleaseDateDay.value] = dateFormater(movieData.release_date); //done
  movieGenre.value = movieData.genre; //done
}

async function setMovieDetails(movieData) {
  const moviePoster = document.getElementById("movie_poster");
  const movieDetails = document.querySelector("#movie_details");

  // set poster
  moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w154/${movieData.img}" alt="${movieData.name}">`;

  const movieDetailsDiv = `
      <h3>${movieData.name}</h3>
      <p>genre: ${movieData.genre}</p>
      <p>release date: ${movieData.release_date}</p>
  `;
  // set details
  movieDetails.innerHTML = movieDetailsDiv;
}

function removeHidden() {
  const newMovieForm = document.querySelector(".new_movie_wrapper");
  newMovieForm.classList.remove("hidden");
}

async function addClickListener() {
  const items = document.querySelectorAll(".li");
  items.forEach((item) => {
    item.addEventListener("click", async (evt) => {
      evt.preventDefault();
      sessionStorage.clear();
      const movieData = await createMovieObject(evt.currentTarget);
      sessionStorage.setItem("movieData", JSON.stringify(movieData));
      clearMovieList();
      // fillMovieForm(movieData);
      // setMovieDetails(movieData);
      removeHidden();
      switchToSearch();
    });
  });
}

function switchToSearch() {
  window.location.href = "./movies";
}

if (window.location.pathname == "/movies") {
  window.onload = populateForm;
}

function populateForm() {
  console.log(JSON.parse(sessionStorage.movieData));
  const check = document.querySelector("#added_movies");
  console.log(check);
}

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

export { searchListener };
