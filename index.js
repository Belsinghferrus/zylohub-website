

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



// IDs must match the hrefs for sections
const sections = ['hero', 'message', 'problem', 'solution', 'features', 'pricing', 'testimonials', 'faq'];
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



// script.js or inline in <script> after your section

