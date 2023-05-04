"use strict";

const searchContainer = document.querySelector(".search-container");
const searchInvalid = document.querySelector(".search-invalid");
const searchResult = document.querySelector(".search-result");
const searchButton = document.querySelector(".search-btn");
const spinner = document.querySelector(".spinner-container");
const footer = document.querySelector(".footer");

const getMovie = async function () {
  try {
    const userInput = document.getElementById("text").value;
    if (userInput === "") {
      throw new Error(alert("Please enter a Movie/TV show!"));
    }

    searchContainer.style.display = "none";
    spinner.style.display = "flex";
    const spinnerMarkup = `
    <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            class="spinner_aj0A"
            fill="#e50914"
          />
        </svg>
    `;
    spinner.insertAdjacentHTML("afterbegin", spinnerMarkup);

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=85457fb9&t=${userInput}`
    );

    spinner.style.display = "none";

    const data = await res.json();
    console.log(data);

    const genre = data.Genre?.split(", ");
    const directors = data.Director?.split("', '");
    const writers = data.Writer?.split("', '");
    const actors = data.Actors?.split("', '");
    const languages = data.Language?.split("', '");

    if (data.Response === "False" || res.ok === "False") {
      throw new Error(`${data.Error}`);
    }

    const Result = `
    <p class="title">${data.Title}</p>

    <img
      class="movie-poster"
      src="${data.Poster}"
      alt="The Poster of the movie that the user has searched for"
    />

    <div class="genre-release">
          <span class="genre">${genre[0]}</span>
          <span class="release">Released in ${data.Year}</span>
        </div>

    <div class="ratings-container">
      <ion-icon class="ratings-icon" name="star"></ion-icon>
      <p class="ratings">${data.imdbRating} / 10</p>
      <p class="votes">(Based on ${data.imdbVotes} votes)</p>
    </div>

    
    <p class="plot-summary">
      ${data.Plot}
    </p>

    <div class="awards">
    <span class="boxoffice-info">${
      data.BoxOffice
    } in Box-office collection</span>
    <span class="awards-info"
      >${data.Awards} in awards</span
    >
  </div>

    <ul class="directors-list">
    <p class="list-heading">Directed by:</p>
    ${directors.map((d) => {
      return `
        <li class="list">&rarr; ${d}</li>`;
    })}
    </ul>

    <ul class="writers-list">
      <p class="list-heading">Written by:</p>
      ${writers.map((w) => {
        return `<li class="list">&rarr; ${w}</li>`;
      })}  
    </ul>

    <ul class="actors-list">
      <p class="list-heading">Cast:</p>
      ${actors.map((a) => {
        return `<li class="list">&rarr; ${a}</li>`;
      })}
    </ul>

    <ul class="languages-list">
      <p class="list-heading">Languages:</p>
      ${languages.map((l) => {
        return `<li class="list">&rarr; ${l}</li>`;
      })}
    </ul>

    
    <div class="go-back">
      <a class="home-link" href="index.html">&larr; Home</a>
    </div>
    
    `;

    footer.style.display = "block";
    searchInvalid.style.display = "none";
    searchResult.style.display = "flex";
    searchResult.insertAdjacentHTML("afterbegin", Result);
  } catch (err) {
    console.error(err);

    const invalidSearch = `
    <img
    class="search-invalid-icon"
    src="img/search_error.svg"
    alt="Image that is showing that no search result has been found for the user query."
  />
  <p class="search-invalid-heading">Oops! Movie not found!</p>
  <p class="search-invalid-info">
    Try searching for something else or try with a different spelling.
  </p>
    `;

    searchResult.style.display = "none";
    searchContainer.style.display = "none";
    searchInvalid.style.display = "flex";
    searchInvalid.insertAdjacentHTML("afterbegin", invalidSearch);
  }
};

searchButton.addEventListener("click", getMovie);
