/* ===========================
   STEM NOMINATION PAGE
   =========================== */

/* ---- Mobile nav ---- */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

/* ---- Character counters ---- */
function initCharCounters() {
  const bioArea = document.getElementById('nom-bio');
  const bioCount = document.getElementById('bio-count');
  const quoteArea = document.getElementById('nom-quote');
  const quoteCount = document.getElementById('quote-count');

  if (bioArea && bioCount) {
    bioArea.addEventListener('input', () => {
      bioCount.textContent = bioArea.value.length;
    });
  }

  if (quoteArea && quoteCount) {
    quoteArea.addEventListener('input', () => {
      quoteCount.textContent = quoteArea.value.length;
    });
  }
}

/* ---- Validation ---- */
function validate(form) {
  let valid = true;

  const fields = [
    { id: 'nom-name',  errId: 'err-name',  msg: 'Please enter the person\'s full name.' },
    { id: 'nom-field', errId: 'err-field', msg: 'Please select a field of STEM.' },
    { id: 'nom-bio',   errId: 'err-bio',   msg: 'Please write a biography (at least 50 characters).', minLen: 50 },
    { id: 'nom-quote', errId: 'err-quote', msg: 'Please enter an inspirational quote.' },
  ];

  fields.forEach(({ id, errId, msg, minLen }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(errId);
    if (!el || !errEl) return;

    el.classList.remove('invalid');
    errEl.textContent = '';

    const val = el.value.trim();

    if (!val) {
      errEl.textContent = msg;
      el.classList.add('invalid');
      valid = false;
    } else if (minLen && val.length < minLen) {
      errEl.textContent = `Please write at least ${minLen} characters (currently ${val.length}).`;
      el.classList.add('invalid');
      valid = false;
    }
  });

  // Optional URL validation
  const photoEl = document.getElementById('nom-photo');
  const photoErr = document.getElementById('err-photo');
  if (photoEl && photoErr && photoEl.value.trim()) {
    try {
      new URL(photoEl.value.trim());
      photoEl.classList.remove('invalid');
      photoErr.textContent = '';
    } catch {
      photoEl.classList.add('invalid');
      photoErr.textContent = 'Please enter a valid URL (or leave blank).';
      valid = false;
    }
  }

  return valid;
}

/* ---- Form submission ---- */
function initForm() {
  const form = document.getElementById('nominate-form');
  const successPanel = document.getElementById('nominate-success');
  const submitBtn = document.getElementById('submit-btn');
  const againBtn = document.getElementById('nominate-again-btn');

  if (!form) return;

  // Clear error on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('invalid');
      const errId = 'err-' + el.id.replace('nom-', '');
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate(form)) return;

    // Gather data
    const nomination = {
      name:       document.getElementById('nom-name').value.trim(),
      field:      document.getElementById('nom-field').value,
      photo:      document.getElementById('nom-photo').value.trim(),
      bio:        document.getElementById('nom-bio').value.trim(),
      quote:      document.getElementById('nom-quote').value.trim(),
      submitter:  document.getElementById('nom-submitter').value.trim(),
      timestamp:  new Date().toISOString(),
    };

    // Simulate async submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    setTimeout(() => {
      // In a real app this would POST to an API
      console.log('Nomination submitted:', nomination);

      // Store locally so the demo can reference it
      try {
        const existing = JSON.parse(localStorage.getItem('stem_nominations') || '[]');
        existing.push(nomination);
        localStorage.setItem('stem_nominations', JSON.stringify(existing));
      } catch (err) {
        // localStorage unavailable — that's fine
      }

      form.hidden = true;
      if (successPanel) successPanel.hidden = false;
    }, 800);
  });

  if (againBtn) {
    againBtn.addEventListener('click', () => {
      if (successPanel) successPanel.hidden = true;
      form.hidden = false;
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Nomination';
      document.getElementById('bio-count').textContent = '0';
      document.getElementById('quote-count').textContent = '0';
      form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
      form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    });
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCharCounters();
  initForm();
});
