

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
  animatedElements.forEach(el => animationObserver.observe(el));
});




// ========================================
// NAVIGATION DOTS ACTIVE STATE
// ========================================
const sections = ['hero', 'message', 'problem', 'solution', 'about', 'hoster', 'Seeker', 'working', 'features', 'pricing', 'testimonials', 'faq'];
const navLinks = document.querySelectorAll('.nav-dot');

// Intersection Observer Setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target.id);
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (idx > -1) navLinks[idx].classList.add('active');
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});






// ========================================
// INFINITE HORIZONTAL SCROLL EFFECT
// ========================================
const scrollContainer = document.getElementById('scroll-content');

// Duplicate the content exactly the same (no margin difference)
scrollContainer.innerHTML += scrollContainer.innerHTML;

let scrollPos = 0;
const scrollStep = 1; // Scroll speed in pixels per frame

function scrollLoop() {
  scrollPos += scrollStep;
  // Reset scroll position for seamless effect
  if (scrollPos >= scrollContainer.scrollWidth / 2) {
    scrollPos = 0;
  }
  scrollContainer.style.transform = `translateX(${-scrollPos}px)`;
  requestAnimationFrame(scrollLoop);
}

scrollLoop();




// ========================================
// MISSION STATEMENT FADE & SLIDE UP
// ========================================
const targets = document.querySelectorAll('.fade-slide-up');
const options = { threshold: 0.2 };
const missionObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, options);
targets.forEach(target => {
  target.classList.add('opacity-0', 'translate-y-10');
  missionObserver.observe(target);
});




const HosterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => HosterObserver.observe(el));