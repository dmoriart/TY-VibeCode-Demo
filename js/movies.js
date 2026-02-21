/* ===========================
   MOVIE REVIEW PAGE
   =========================== */

const MOVIES = [
  {
    rank: 1,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: ['drama'],
    rating: 9.3,
    runtime: '2h 22m',
    color: '#e85d04',
    emoji: '🔓',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    review: `A masterpiece of quiet perseverance. Andy Dufresne's journey through Shawshank
    prison is one of cinema's greatest portraits of hope. Darabont extracts career-best
    performances from both Tim Robbins and Morgan Freeman, weaving a story that feels
    timeless and deeply human. By the final frame, you'll feel it in your chest.`,
    stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    poster: { bg: 'linear-gradient(135deg, #1a0a00, #e85d04, #ffd60a)', symbol: '🔓' },
  },
  {
    rank: 2,
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    genre: ['crime', 'drama'],
    rating: 9.2,
    runtime: '2h 55m',
    color: '#c9184a',
    emoji: '🌹',
    tagline: 'An offer you can\'t refuse.',
    review: `Coppola's magnum opus redefined what a crime film could be. Marlon Brando's
    Don Corleone is the most iconic performance in screen history — commanding, tender, and
    terrifying in equal measure. Every scene is a lesson in filmmaking craft. This is the
    film that invented the modern movie mafia, and nothing has come close since.`,
    stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    poster: { bg: 'linear-gradient(135deg, #0a0005, #c9184a, #590d22)', symbol: '🌹' },
  },
  {
    rank: 3,
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    genre: ['thriller', 'drama'],
    rating: 9.0,
    runtime: '2h 32m',
    color: '#00f0ff',
    emoji: '🦇',
    tagline: 'Why so serious?',
    review: `Heath Ledger's Joker is one of the most electrifying performances ever committed
    to film. Nolan elevates the superhero genre into a genuine crime epic, asking real questions
    about chaos, order, and what makes a hero. The ferry scene alone is a masterclass in moral
    tension. The cape is incidental — this is a film about ideas.`,
    stars: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    poster: { bg: 'linear-gradient(135deg, #000510, #00f0ff20, #0a0a1a)', symbol: '🦇' },
  },
  {
    rank: 4,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    genre: ['crime', 'thriller'],
    rating: 8.9,
    runtime: '2h 34m',
    color: '#f72585',
    emoji: '💼',
    tagline: 'You won\'t know the facts until you\'ve seen the fiction.',
    review: `Tarantino blew cinema wide open with this fractured, hyper-verbal fever dream.
    Three interlocking stories, pop culture philosophy, and dialogue that crackles like lightning.
    Uma Thurman's overdose scene, Travolta's comeback, Samuel L. Jackson as Jules — it's all iconic.
    It made independent cinema feel dangerous and cool again.`,
    stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    poster: { bg: 'linear-gradient(135deg, #10000a, #f72585, #7209b7)', symbol: '💼' },
  },
  {
    rank: 5,
    title: "Schindler's List",
    year: 1993,
    director: 'Steven Spielberg',
    genre: ['drama'],
    rating: 8.9,
    runtime: '3h 15m',
    color: '#b5e48c',
    emoji: '📋',
    tagline: 'Whoever saves one life, saves the world entire.',
    review: `Spielberg's most important film. Shot in searing black-and-white, it follows
    Oskar Schindler's transformation from opportunist to saviour during the Holocaust. The
    little girl in the red coat remains one of cinema's most haunting images. This isn't
    entertainment — it's testimony. Devastating, essential, and impossible to shake.`,
    stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
    poster: { bg: 'linear-gradient(135deg, #111, #333, #111)', symbol: '📋' },
  },
  {
    rank: 6,
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    director: 'Peter Jackson',
    genre: ['drama'],
    rating: 8.9,
    runtime: '3h 21m',
    color: '#ffd60a',
    emoji: '💍',
    tagline: 'The eye of the enemy is moving.',
    review: `The greatest trilogy in cinema history ends with a triumph that genuinely
    earns its emotion. Jackson juggles dozens of storylines across two worlds and somehow
    makes every thread land with impact. The Battle of Pelennor Fields is still the most
    spectacular sequence ever put on screen. All eleven Academy Awards were deserved.`,
    stars: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'],
    poster: { bg: 'linear-gradient(135deg, #0a0800, #ffd60a, #7c5c00)', symbol: '💍' },
  },
  {
    rank: 7,
    title: 'Forrest Gump',
    year: 1994,
    director: 'Robert Zemeckis',
    genre: ['drama'],
    rating: 8.8,
    runtime: '2h 22m',
    color: '#90e0ef',
    emoji: '🏃',
    tagline: 'Life is like a box of chocolates.',
    review: `A warm, melancholy portrait of America told through the eyes of a man who
    witnesses everything and understands only what matters. Tom Hanks gives one of the
    great performances — earnest, funny, deeply moving. The film is sentimental, but it
    earns every tear. "Run, Forrest, run!" still gives people chills thirty years later.`,
    stars: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    poster: { bg: 'linear-gradient(135deg, #001a2c, #90e0ef, #023e8a)', symbol: '🏃' },
  },
  {
    rank: 8,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    genre: ['sci-fi', 'thriller'],
    rating: 8.8,
    runtime: '2h 28m',
    color: '#7c3aed',
    emoji: '🌀',
    tagline: 'Your mind is the scene of the crime.',
    review: `A puzzle box wrapped in a blockbuster. Nolan plants an idea inside a heist
    film inside a dream — and somehow keeps you oriented through four layers of reality.
    The Paris fold scene remains a jaw-dropper. Hans Zimmer's score is practically a
    character itself. And that spinning top ending sparked arguments that haven't stopped yet.`,
    stars: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    poster: { bg: 'linear-gradient(135deg, #0a0015, #7c3aed, #0d0021)', symbol: '🌀' },
  },
  {
    rank: 9,
    title: 'Fight Club',
    year: 1999,
    director: 'David Fincher',
    genre: ['thriller', 'drama'],
    rating: 8.8,
    runtime: '2h 19m',
    color: '#ff6b35',
    emoji: '🥊',
    tagline: 'The first rule of Fight Club is: you do not talk about Fight Club.',
    review: `Fincher's corrosive satire of consumerism and masculinity is as sharp now as
    it was in 1999. Brad Pitt as Tyler Durden is one of cinema's great antiheroes — magnetic
    and monstrous. The twist reshapes everything, but the film's ideas are what linger.
    Subversive, stylish, and genuinely unnerving. The ending hits like a freight train.`,
    stars: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
    poster: { bg: 'linear-gradient(135deg, #0f0800, #ff6b35, #3a0a00)', symbol: '🥊' },
  },
  {
    rank: 10,
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    genre: ['sci-fi', 'drama'],
    rating: 8.7,
    runtime: '2h 49m',
    color: '#48cae4',
    emoji: '🚀',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    review: `Nolan's most emotionally ambitious film. A father's love story dressed as a
    space epic, Interstellar swings for the cosmic and the intimate simultaneously. The
    tesseract sequence is pure cinema magic. Hans Zimmer's organ-driven score is the best
    of his career. When Cooper watches 23 years of messages through tears, so do you.`,
    stars: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    poster: { bg: 'linear-gradient(135deg, #000a14, #48cae4, #001529)', symbol: '🚀' },
  },
];

/* ---- State ---- */
let currentFilter = 'all';
let currentSort = 'rank';
let filteredMovies = [...MOVIES];

/* ---- DOM Refs ---- */
const grid = document.getElementById('movies-grid');
const modal = document.getElementById('movie-modal');
const modalInner = document.getElementById('modal-inner');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const sortSelect = document.getElementById('sort-select');
const filterBtns = document.querySelectorAll('.filter-btn');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

/* ---- Render Stars ---- */
function renderStars(rating) {
  const full = Math.floor(rating / 2);
  const half = (rating / 2) % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ---- Create Poster ---- */
function createPosterSVG(movie) {
  return `
    <div class="movie-poster" style="background: ${movie.poster.bg};">
      <span class="poster-rank">#${movie.rank}</span>
      <span class="poster-emoji">${movie.poster.symbol}</span>
    </div>
  `;
}

/* ---- Render Movie Card ---- */
function renderCard(movie) {
  const genreTags = movie.genre.map(g =>
    `<span class="genre-tag" data-genre="${g}">${g}</span>`
  ).join('');

  return `
    <article class="movie-card glass-card animate-in" data-rank="${movie.rank}" tabindex="0" role="button" aria-label="View details for ${movie.title}">
      ${createPosterSVG(movie)}
      <div class="movie-card-body">
        <div class="movie-meta-row">
          <span class="movie-year">${movie.year}</span>
          <div class="genre-tags">${genreTags}</div>
        </div>
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-director">dir. ${movie.director}</p>
        <div class="movie-rating-row">
          <span class="movie-stars" style="color: ${movie.color}">${renderStars(movie.rating)}</span>
          <span class="movie-score">${movie.rating}/10</span>
        </div>
        <p class="movie-tagline">"${movie.tagline}"</p>
        <button class="btn btn-secondary movie-read-more" data-rank="${movie.rank}">Read Review →</button>
      </div>
    </article>
  `;
}

/* ---- Render Grid ---- */
function renderGrid() {
  let movies = [...MOVIES];

  if (currentFilter !== 'all') {
    movies = movies.filter(m => m.genre.includes(currentFilter));
  }

  switch (currentSort) {
    case 'year':
      movies.sort((a, b) => b.year - a.year);
      break;
    case 'rating':
      movies.sort((a, b) => b.rating - a.rating);
      break;
    default:
      movies.sort((a, b) => a.rank - b.rank);
  }

  filteredMovies = movies;
  grid.innerHTML = movies.map(renderCard).join('');

  // Attach card click handlers
  grid.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('movie-read-more')) return;
      openModal(Number(card.dataset.rank));
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(Number(card.dataset.rank));
    });
  });

  grid.querySelectorAll('.movie-read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(Number(btn.dataset.rank));
    });
  });
}

/* ---- Modal ---- */
function openModal(rank) {
  const movie = MOVIES.find(m => m.rank === rank);
  if (!movie) return;

  const genreTags = movie.genre.map(g =>
    `<span class="genre-tag" data-genre="${g}">${g}</span>`
  ).join('');

  modalInner.innerHTML = `
    <div class="modal-poster" style="background: ${movie.poster.bg};">
      <span class="modal-poster-rank">#${movie.rank}</span>
      <span class="modal-poster-emoji">${movie.poster.symbol}</span>
    </div>
    <div class="modal-details">
      <div class="movie-meta-row">
        <span class="movie-year">${movie.year}</span>
        <span class="movie-runtime">${movie.runtime}</span>
        <div class="genre-tags">${genreTags}</div>
      </div>
      <h2 class="modal-title" style="color: ${movie.color}">${movie.title}</h2>
      <p class="movie-director">Directed by ${movie.director}</p>
      <div class="movie-rating-row modal-rating">
        <span class="movie-stars" style="color: ${movie.color}">${renderStars(movie.rating)}</span>
        <span class="movie-score">${movie.rating}/10</span>
      </div>
      <blockquote class="modal-tagline">"${movie.tagline}"</blockquote>
      <p class="modal-review">${movie.review.trim()}</p>
      <div class="modal-cast">
        <h4>Starring</h4>
        <div class="cast-list">
          ${movie.stars.map(s => `<span class="cast-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ---- Event Listeners ---- */
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderGrid();
  });
});

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderGrid();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ---- Init ---- */
renderGrid();
