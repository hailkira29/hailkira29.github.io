// Initialize Rellax for parallax effects
const rellax = new Rellax('.parallax-bg, .parallax-layer, .about-photo', {
  speed: -2,
  center: true,
});

// Header scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Dot navigation
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dots.forEach((dot) => {
          dot.classList.toggle('active', dot.getAttribute('data-section') === entry.target.id);
        });
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((section) => observer.observe(section));

// Fade-in for project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
projectCards.forEach((card) => projectObserver.observe(card));

// Modal handling
const projectButtons = document.querySelectorAll('.view-project');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');
projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(`modal-${button.dataset.project}`);
    modal.classList.remove('hidden');
  });
});
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.modal').classList.add('hidden');
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach((modal) => modal.classList.add('hidden'));
  }
});

// Smooth scrolling polyfill for Safari
if (!('scrollBehavior' in document.documentElement.style)) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
