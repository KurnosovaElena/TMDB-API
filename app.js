const API_KEY = 'api_key=b2b0b2ad527b38a4cc8c7309f1b138e7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
      fetch(url).then(res => res.json()).then(data => {
        console.log(data)
         showMovies(data.results);
      })
  }

  function showMovies(data) {
    main.innerHTML = '';    
    console.log(Object.keys(data));
    data.forEach(movie => {
    // Object.keys(data).forEach(movie => {
      const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <span class="rate">${vote_average}</span>
        <img src="${IMAGE_URL+poster_path}" alt="${title}">
        <div class="main-information">
            <h3>${title}</h3>
        </div>
        <div class="description">
            <h3>Description</h3>
            ${overview}
        </div>
        
        `
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
  }

})

function clearSearchInput() {
  var input = document.getElementById('search');
  input.value = ''; // Очищаем поле ввода
  input.focus(); // Переносим фокус обратно на поле ввода
}