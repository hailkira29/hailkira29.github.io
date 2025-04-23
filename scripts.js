/ ===== Utility =====
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const header = document.getElementById('mainHeader');
let lastScroll = 0;

// Smooth scroll for dot navigation
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

// Highlight active dot & trigger animations
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const idx = [...sections].indexOf(entry.target);
    if (entry.intersectionRatio > 0.5) {
      dots[idx].classList.add('active');
      entry.target.classList.add('show');
    } else {
      dots[idx].classList.remove('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => io.observe(section));

// Header show/hide on scroll
window.addEventListener('scroll', () => {
  const current = window.pageYOffset;
  if (current > lastScroll) header.classList.add('hidden');
  else header.classList.remove('hidden');
  lastScroll = current;
});

// Horizontal skill scroll (CSS snap handles main movement)
const skillTrack = document.querySelector('.skill-track');
if (skillTrack) {
  skillTrack.addEventListener('mousemove', e => {
    // Tilt effect
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.setProperty('--rx', `${-y / 20}deg`);
      card.style.setProperty('--ry', `${x / 20}deg`);
    });
  });
}

// Project modals
const thumbs = document.querySelectorAll('.project-thumb');
const modals = document.querySelectorAll('.modal');
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.getElementById(thumb.dataset.modal).classList.add('open');
  });
});
modals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target.matches('.close, .modal')) modal.classList.remove('open');
  });
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
});

// Lazy fade‑in for project thumbnails
const fadeIns = document.querySelectorAll('.fade-in');
const fadeIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.3 });
fadeIns.forEach(el => fadeIO.observe(el));

// Init Rellax (after DOM loaded)
window.addEventListener('DOMContentLoaded', () => new Rellax('.rellax'));
