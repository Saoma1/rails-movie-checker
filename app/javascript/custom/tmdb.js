require("dotenv").config();

const movieSearch = (searchInput) => {
  var key = process.env.TMDB_API_KEY;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=`;
  const results = document.querySelector("#results");

  fetch(`${searchUrl} + ${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      // <img src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="">
      console.log(data);
      data.results.slice(0, 10).forEach((result) => {
        result.addEventListener("click", (evt) => {
          evt.preventDefault();
          // console.log(search_input.value);
        });
        const movie = `<li class="list-inline-item">
                    <p>${result.original_title}</p>
                    </li>`;
        results.insertAdjacentHTML("beforeend", movie);
      });
    });
  results.innerHTML = "";
};

const tmdbSearch = () => {
  const search_input = document.querySelector("#search_input");

  search_input.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    console.log(search_input.value);
    let input = search_input.value;
    movieSearch(input);
  });
};

export { tmdbSearch };
