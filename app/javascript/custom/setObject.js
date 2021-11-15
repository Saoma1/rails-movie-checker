function checkWindow() {
  if (window.location.pathname == "/movies") {
    window.onload = populateForm;
  }
}

function populateForm() {
  const check = document.querySelector("#added_movies");
  fillMovieForm();
  setMovieDetails();
  removeHidden();
}

async function fillMovieForm() {
  const movieData = JSON.parse(sessionStorage.movieData);
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

const dateFormater = (dateString) => {
  return [Number(dateString.substring(0, 4)), Number(dateString.substring(5, 7)), Number(dateString.substring(8, 10))];
};

async function setMovieDetails() {
  const movieData = JSON.parse(sessionStorage.movieData);
  console.log(movieData);

  // select elements from DOM movie_rating
  const movieBackdrop = document.querySelector(".movie_backdrop");
  const moviePoster = document.querySelector("#movie_poster");
  const movieRating = document.querySelector(".movie_rating_wrapper");
  const movieDetails = document.querySelector("#movie_details");
  const movieOverview = document.querySelector(".movie_overview");

  // set backdrop
  movieBackdrop.innerHTML = `<img src="https://image.tmdb.org/t/p/w780/${movieData.imgBackdrop}" alt="${movieData.name}">`;

  // set rating
  movieRating.innerHTML = `
      RATING
      <div class='movie_rating'><h1>${movieData.vote_average}</h1></div>
      <div class='movie_release'>
        RELEASE
        <h2> ${movieData.release_date}</h2>
      </div>
  `;

  // set poster
  moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w154/${movieData.img}" alt="${movieData.name}">`;

  // create movie details
  const movieDetailsDiv = `
      <h1>${movieData.name}</h1>
      <div class='tags flex-n'>
        ${movieData.genre
          .map((tag) => {
            return `<p class='tag'>${tag}</p>`;
          })
          .join("")}
      </div>
  `;

  // set details
  movieDetails.innerHTML = movieDetailsDiv;

  // set Overview
  movieOverview.innerHTML = `STORY<p>${movieData.overview}</p>`;
}

function removeHidden() {
  const newMovieForm = document.querySelector(".new_movie_wrapper");
  newMovieForm.classList.remove("hidden");
}

export { checkWindow };
