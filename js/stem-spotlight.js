/* ===========================
   STEM SPOTLIGHT PAGE
   =========================== */

const SPOTLIGHTS = [
  {
    id: 1,
    name: 'Katherine Johnson',
    field: 'Mathematics',
    photo: null,
    initials: 'KJ',
    color: ['#6366f1', '#8b5cf6'],
    bio: 'A NASA mathematician whose orbital mechanics calculations were critical to the success of the first U.S. crewed spaceflights. Her work on trajectory analysis for Project Mercury and Apollo 11 helped put humans on the Moon. President Obama awarded her the Presidential Medal of Freedom in 2015.',
    quote: 'Girls are capable of doing everything men are capable of doing. Sometimes they have more imagination than men.',
    featured: true,
  },
  {
    id: 2,
    name: 'Marie Curie',
    field: 'Physics',
    photo: null,
    initials: 'MC',
    color: ['#0ea5e9', '#38bdf8'],
    bio: 'The first woman to win a Nobel Prize — and the only person ever to win in two different sciences. Her pioneering research on radioactivity led to discoveries of polonium and radium, revolutionizing our understanding of atomic structure and laying the groundwork for modern nuclear medicine.',
    quote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    featured: false,
  },
  {
    id: 3,
    name: 'Ada Lovelace',
    field: 'Computer Science',
    photo: null,
    initials: 'AL',
    color: ['#ec4899', '#f472b6'],
    bio: 'Widely regarded as the world\'s first computer programmer. Working alongside Charles Babbage in the 1840s, she wrote the first algorithm intended to be processed by a machine — the Analytical Engine — over a century before the modern computer was invented.',
    quote: 'The more I study, the more insatiable do I feel my genius for it to be.',
    featured: false,
  },
  {
    id: 4,
    name: 'Rosalind Franklin',
    field: 'Biology',
    photo: null,
    initials: 'RF',
    color: ['#10b981', '#34d399'],
    bio: 'A chemist and X-ray crystallographer whose X-ray diffraction images of DNA — particularly Photo 51 — were pivotal in determining the double helix structure. Her meticulous research laid essential groundwork for modern molecular biology and our understanding of genetics.',
    quote: 'Science and everyday life cannot and should not be separated.',
    featured: false,
  },
  {
    id: 5,
    name: 'Grace Hopper',
    field: 'Computer Science',
    photo: null,
    initials: 'GH',
    color: ['#f59e0b', '#fbbf24'],
    bio: 'A U.S. Navy rear admiral and computer science pioneer who invented one of the first linkers and popularized the idea of machine-independent programming languages. She led development of COBOL — one of the first high-level programming languages — and coined the term "debugging."',
    quote: 'The most dangerous phrase in the language is: We\'ve always done it this way.',
    featured: false,
  },
  {
    id: 6,
    name: 'Mae C. Jemison',
    field: 'Aerospace',
    photo: null,
    initials: 'MJ',
    color: ['#8b5cf6', '#a78bfa'],
    bio: 'The first African American woman to travel to space, launching aboard the Space Shuttle Endeavour in 1992. A physician and engineer, she later founded two technology companies and the 100 Year Starship project, which seeks to enable human interstellar travel within a century.',
    quote: 'Never limit yourself because of others\' limited imagination; never limit others because of your own limited imagination.',
    featured: false,
  },
];

/* ---- Avatar helpers ---- */
function makeGradient(colors) {
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

function buildPlaceholder(person) {
  const div = document.createElement('div');
  div.className = 'stem-card-placeholder';
  div.style.background = makeGradient(person.color);
  div.textContent = person.initials;
  return div;
}

function buildFeaturedPlaceholder(person) {
  const div = document.createElement('div');
  div.className = 'stem-photo-placeholder';
  div.style.background = makeGradient(person.color);
  div.textContent = person.initials;
  return div;
}

/* ---- Render featured card ---- */
function renderFeatured() {
  const person = SPOTLIGHTS.find(p => p.featured) || SPOTLIGHTS[0];
  const card = document.getElementById('featured-card');
  if (!card) return;

  const photoSection = document.createElement('div');
  photoSection.className = 'stem-featured-photo';
  photoSection.style.background = makeGradient(person.color);

  if (person.photo) {
    const img = document.createElement('img');
    img.src = person.photo;
    img.alt = person.name;
    photoSection.appendChild(img);
  } else {
    photoSection.appendChild(buildFeaturedPlaceholder(person));
  }

  const badgeDiv = document.createElement('div');
  badgeDiv.className = 'stem-featured-badge';
  badgeDiv.innerHTML = '<span class="badge badge-stem">Featured Spotlight</span>';
  photoSection.appendChild(badgeDiv);

  const contentSection = document.createElement('div');
  contentSection.className = 'stem-featured-content';
  contentSection.innerHTML = `
    <span class="stem-field-tag">${person.field}</span>
    <h2>${person.name}</h2>
    <p class="stem-featured-bio">${person.bio}</p>
    <blockquote class="stem-featured-quote">${person.quote}</blockquote>
  `;

  card.appendChild(photoSection);
  card.appendChild(contentSection);
}

/* ---- Render spotlight grid ---- */
function renderGrid(filter = 'all') {
  const grid = document.getElementById('stem-grid');
  if (!grid) return;

  const list = filter === 'all'
    ? SPOTLIGHTS
    : SPOTLIGHTS.filter(p => p.field === filter);

  grid.innerHTML = '';

  list.forEach(person => {
    const card = document.createElement('div');
    card.className = 'stem-card animate-in';
    card.dataset.field = person.field;

    const photoDiv = document.createElement('div');
    photoDiv.className = 'stem-card-photo';
    photoDiv.style.background = makeGradient(person.color);

    if (person.photo) {
      const img = document.createElement('img');
      img.src = person.photo;
      img.alt = person.name;
      photoDiv.appendChild(img);
    } else {
      photoDiv.appendChild(buildPlaceholder(person));
    }

    const body = document.createElement('div');
    body.className = 'stem-card-body';
    body.innerHTML = `
      <span class="stem-card-field">${person.field}</span>
      <h3 class="stem-card-name">${person.name}</h3>
      <p class="stem-card-bio">${person.bio}</p>
      <p class="stem-card-quote">${person.quote}</p>
    `;

    card.appendChild(photoDiv);
    card.appendChild(body);
    grid.appendChild(card);
  });

  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;padding:2rem 0;">No spotlights found for this field yet.</p>';
  }
}

/* ---- Filter buttons ---- */
function initFilters() {
  const buttons = document.querySelectorAll('.stem-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.field);
    });
  });
}

/* ---- Mobile nav ---- */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderFeatured();
  renderGrid();
  initFilters();
});
