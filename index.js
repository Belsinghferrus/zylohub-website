

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
const sections = ['hero', 'message', 'problem', 'solution', 'about', 'hoster', 'Seeker', 'working', 'features', 'waitlist', 'faq', 'footer'];
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



// ========================================
// WAITLIST FORM LOGIC
// ========================================
(function () {
  // DOM Elements
  const roleBtns = document.querySelectorAll('.role-btn');
  const emailInput = document.getElementById('emailInput');
  const joinBtn = document.getElementById('joinBtn');
  const joinBtnText = document.getElementById('joinBtnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const roleError = document.getElementById('roleError');
  const emailError = document.getElementById('emailError');
  const successMessage = document.getElementById('successMessage');
  let selectedRole = null;
  const STORAGE_KEY = 'zylohub-waitlist';

  // Role selector logic
  function selectRole(btn) {
    roleBtns.forEach(b => {
      b.classList.remove('border-[#FFD02B]', 'scale-[1.01]');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('border-[#FFD02B]', 'scale-[1.01]');
    btn.setAttribute('aria-checked', 'true');
    selectedRole = btn.getAttribute('data-role');
    roleError.classList.add('hidden');
  }
  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => selectRole(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        selectRole(btn);
      }
    });
  });

  // Email validation
  function validateEmail(email) {
    if (!email) return { ok: false, message: 'Please enter your email address.' };
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) return { ok: false, message: 'Please enter a valid email address.' };
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain !== 'gmail.com') return { ok: false, message: 'Please use a Gmail address (example@gmail.com).' };
    return { ok: true };
  }

  function setLoading(loading) {
    joinBtn.disabled = loading;
    if (loading) {
      joinBtn.classList.add('opacity-90', 'cursor-wait');
      joinBtnText.classList.add('opacity-0');
      btnSpinner.classList.remove('hidden');
      emailInput.disabled = true;
      roleBtns.forEach(b => b.disabled = true);
    } else {
      joinBtn.classList.remove('opacity-90', 'cursor-wait');
      joinBtnText.classList.remove('opacity-0');
      btnSpinner.classList.add('hidden');
      emailInput.disabled = false;
      roleBtns.forEach(b => b.disabled = false);
    }
  }

  function saveToLocalStorage(entry) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let arr = [];
      if (raw) {
        arr = JSON.parse(raw) || [];
        if (!Array.isArray(arr)) arr = [];
      }
      arr.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return true;
    } catch (e) { return false; }
  }

  joinBtn.addEventListener('click', () => {
    emailError.classList.add('hidden');
    roleError.classList.add('hidden');
    successMessage.classList.add('hidden');
    const email = emailInput.value.trim();

    // Validation
    if (!selectedRole) {
      roleError.classList.remove('hidden');
      roleError.textContent = 'Please select your role.';
      return;
    }
    const v = validateEmail(email);
    if (!v.ok) {
      emailError.classList.remove('hidden');
      emailError.textContent = v.message;
      return;
    }
    setLoading(true);
    const entry = { role: selectedRole, email, date: new Date().toISOString() };
    const saved = saveToLocalStorage(entry);
    setTimeout(() => {
      setLoading(false);
      if (saved) {
        successMessage.classList.remove('hidden');
        successMessage.textContent = `✅ You're on the waitlist as a ${selectedRole}! Thanks.`;
        // Reset
        emailInput.value = '';
        roleBtns.forEach(b => {
          b.classList.remove('border-[#FFD02B]', 'scale-[1.01]');
          b.setAttribute('aria-checked', 'false');
        });
        selectedRole = null;
        setTimeout(() => successMessage.classList.add('hidden'), 4000);
      } else {
        emailError.classList.remove('hidden');
        emailError.textContent = 'Unable to save — please try again (localStorage error).';
      }
    }, 850);
  });

})();



// ========================================
// FAQ ACCORDION LOGIC
// ========================================
function toggleFAQ(event) {
  const button = event.currentTarget;
  const item = button.parentElement;
  const answer = button.nextElementSibling;
  const icon = button.querySelector('.faq-icon');
  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

  // Close all other FAQs
  document.querySelectorAll('.faq-answer').forEach(ans => {
    ans.style.maxHeight = '0px';
  });
  document.querySelectorAll('.faq-icon').forEach(ic => {
    ic.style.transform = 'rotate(0deg)';
  });

  // Toggle current FAQ
  if (!isOpen) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  } else {
    answer.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
  }
}