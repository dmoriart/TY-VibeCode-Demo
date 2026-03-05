/* ===========================
   LANDING PAGE — Particles & Animations
   =========================== */

// --- Particle System ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    // Cyan, magenta, or purple tint
    const colors = [
      [0, 240, 255],
      [255, 0, 229],
      [124, 58, 237]
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse repulsion
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= (dx / dist) * force * 2;
        this.y -= (dy / dist) * force * 2;
      }
    }

    // Wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const opacity = (1 - dist / 120) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  drawConnections();
  requestAnimationFrame(animateParticles);
}

// Init
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// --- Nav Toggle ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- Animated Counter ---
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const linesEl = document.getElementById('stat-lines');
      const filesEl = document.getElementById('stat-files');
      animateCounter(linesEl, 2847);
      animateCounter(filesEl, 12, 1200);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  statsObserver.observe(statsBar);
}

// --- Women in STEM Homepage Grid ---
const STEM_PREVIEW = [
  {
    name: 'Katherine Johnson',
    field: 'Mathematics',
    initials: 'KJ',
    color: ['#6366f1', '#8b5cf6'],
    quote: 'Girls are capable of doing everything men are capable of doing. Sometimes they have more imagination than men.',
    bio: 'NASA mathematician whose orbital mechanics calculations were critical to the first U.S. crewed spaceflights and the Apollo 11 Moon landing.',
  },
  {
    name: 'Marie Curie',
    field: 'Physics',
    initials: 'MC',
    color: ['#0ea5e9', '#38bdf8'],
    quote: 'Nothing in life is to be feared, it is only to be understood.',
    bio: 'The first person to win two Nobel Prizes across two different sciences — Physics and Chemistry — for her research on radioactivity.',
  },
  {
    name: 'Grace Hopper',
    field: 'Computer Science',
    initials: 'GH',
    color: ['#f59e0b', '#fbbf24'],
    quote: 'The most dangerous phrase in the language is: We\'ve always done it this way.',
    bio: 'Pioneering computer scientist and U.S. Navy rear admiral who invented one of the first compilers and led development of COBOL.',
  },
];

function renderStemHomeGrid() {
  const grid = document.getElementById('stem-home-grid');
  if (!grid) return;

  STEM_PREVIEW.forEach(person => {
    const card = document.createElement('div');
    card.className = 'stem-card animate-in';

    const photoDiv = document.createElement('div');
    photoDiv.className = 'stem-card-photo';
    photoDiv.style.background = `linear-gradient(135deg, ${person.color[0]}, ${person.color[1]})`;

    const placeholder = document.createElement('div');
    placeholder.className = 'stem-card-placeholder';
    placeholder.style.background = `linear-gradient(135deg, ${person.color[0]}, ${person.color[1]})`;
    placeholder.textContent = person.initials;
    photoDiv.appendChild(placeholder);

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
}

renderStemHomeGrid();

// --- Scroll-based animations ---
const animateElements = document.querySelectorAll('.animate-in');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  scrollObserver.observe(el);
});
