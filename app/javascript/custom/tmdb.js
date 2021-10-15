require("dotenv").config();

const dateFormater = (dateString) => {
  return [Number(dateString.substring(0, 4)), Number(dateString.substring(5, 7)), Number(dateString.substring(8, 10))];
};

const movieObjCreate = (movieObj) => {
  const movieResult = document.getElementById("result");
  const movieName = document.querySelector(".movie_name");
  const newMovieWrapper = document.querySelector(".new_movie_wrapper");
  const newMovie = document.querySelector("#new_movie");
  const movieDetails = document.querySelector("#movie_details");

  // form input getters
  const movieNameInput = document.getElementById("movie_name");
  const movieReleaseDateYear = document.getElementById("movie_release_date_1i");
  const movieReleaseDateMonth = document.getElementById("movie_release_date_2i");
  const movieReleaseDateDay = document.getElementById("movie_release_date_3i");
  const movieGenre = document.getElementById("movie_genre");

  newMovie.classList.remove("hidden");

  // form input setters
  movieNameInput.value = movieObj.name;
  console.log(movieObj.release_date);
  console.log(movieReleaseDateMonth);
  console.log(dateFormater(movieObj.release_date));
  // movieReleaseDate.value = movieObj.release_date;
  movieGenre.value = movieObj.genre;

  newMovieWrapper.classList.remove("hidden");
  movieName.classList.add("hidden");

  const moviePoster = `
    <img src="https://image.tmdb.org/t/p/w154/${movieObj.img}" alt="${movieObj.name}">
  `;
  const movieDiv = `
      <h3>${movieObj.name}</h3>
      <p>release date: ${movieObj.release_date}</p>
  `;

  movieResult.insertAdjacentHTML("afterbegin", moviePoster);

  movieDetails.insertAdjacentHTML("afterbegin", movieDiv);
};

const movieSearch = (searchInput) => {
  var key = process.env.TMDB_API_KEY;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=`;
  const results = document.querySelector("#results");

  fetch(`${searchUrl} + ${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.slice(0, 10).forEach((result) => {
        const movie = `
          <li class="list-inline-item li"
              data-name="${result.original_title}"
              data-release_date="${result.release_date}"
              data-genre="${result.genre_ids}"
              data-img="${result.poster_path}"
              >
          <p">${result.original_title}</p>
          </li>
        `;
        results.insertAdjacentHTML("beforeend", movie);
      });
      const items = document.querySelectorAll(".li");
      items.forEach((item) => {
        item.addEventListener("click", (evt) => {
          evt.preventDefault();
          const fn = (data) => evt.currentTarget.getAttribute(data);
          const movieObj = {
            name: fn("data-name"),
            release_date: fn("data-release_date"),
            genre: fn("data-genre"),
            img: fn("data-img"),
          };
          results.innerHTML = "";
          movieObjCreate(movieObj);
        });
      });
    });
  results.innerHTML = "";
};

const tmdbSearch = () => {
  const search_input = document.querySelector("#search_input");
  const movieResult = document.getElementById("result");
  const movieDetails = document.querySelector("#movie_details");
  const newMovie = document.querySelector("#new_movie");

  search_input.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    movieResult.innerHTML = "";
    movieDetails.innerHTML = "";
    // newMovie.classList.add("hidden");
    let input = search_input.value;
    movieSearch(input);
  });
};

export { tmdbSearch };
