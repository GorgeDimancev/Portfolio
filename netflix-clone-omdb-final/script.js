const apiKey = '183e98dc';
const baseUrl = 'https://www.omdbapi.com/';

const movieContainer = document.getElementById('movieSlider');
const modal = document.getElementById('movieModal');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.getElementById('closeModal');
const spinner = document.getElementById('spinner');

const categories = [
  'Batman',
  'Spider-Man',
  'Avengers',
  'Harry Potter',
  'Star Wars'
];

let loading = false;

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  if (movie.Poster && movie.Poster !== 'N/A') {
    card.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}" />`;
    card.addEventListener('click', () => showMovieDetails(movie.imdbID));
    return card;
  }
  return null;
}

function showMovieDetails(imdbID) {
  fetch(`${baseUrl}?apikey=${apiKey}&i=${imdbID}`)
    .then(res => res.json())
    .then(movie => {
      modalDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
      `;
      modal.style.display = 'flex';
    });
}

function fetchCategory(title) {
  const section = document.createElement('section');
  section.className = 'movie-row';
  const heading = document.createElement('h2');
  heading.textContent = title;
  const row = document.createElement('div');
  row.className = 'movie-row-list';

  section.appendChild(heading);
  section.appendChild(row);
  movieContainer.appendChild(section);

  fetch(`${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(title)}&page=1`)
    .then(res => res.json())
    .then(data => {
      if (data.Search) {
        data.Search.forEach(movie => {
          const card = createMovieCard(movie);
          if (card) row.appendChild(card);
        });
      }
    });
}

function init() {
  loading = true;
  spinner.style.display = 'block';
  categories.forEach(cat => fetchCategory(cat));
  setTimeout(() => {
    spinner.style.display = 'none';
    loading = false;
  }, 1500);
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', init);
