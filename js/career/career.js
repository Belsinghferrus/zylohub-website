
// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

// Initialize Lucide icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileCareersToggle = document.getElementById(
  "mobileCareersToggle"
);
const mobileCareersMenu = document.getElementById("mobileCareersMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll("span");
    if (mobileMenu.classList.contains("hidden")) {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    } else {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    }
  });
}

if (mobileCareersToggle && mobileCareersMenu) {
  mobileCareersToggle.addEventListener("click", (e) => {
    e.preventDefault();
    mobileCareersMenu.classList.toggle("hidden");
    const icon = mobileCareersToggle.querySelector("i");
    icon.style.transform = mobileCareersMenu.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });
}

// FAQ Accordion with yellow border
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item");
    const answer = button.nextElementSibling;
    const icon = button.querySelector("i");

    // Toggle current answer
    const isHidden = answer.classList.contains("hidden");
    answer.classList.toggle("hidden");
    icon.style.transform = answer.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";

    // Add/remove yellow border
    if (isHidden) {
      faqItem.classList.add("faq-active");
      faqItem.style.borderColor = "#FFD02B";
      faqItem.style.boxShadow = "0 0 20px rgba(255, 208, 43, 0.1)";
    } else {
      faqItem.classList.remove("faq-active");
      faqItem.style.borderColor = "";
      faqItem.style.boxShadow = "";
    }

    // Close other answers
    document.querySelectorAll(".faq-question").forEach((otherButton) => {
      if (otherButton !== button) {
        const otherFaqItem = otherButton.closest(".faq-item");
        const otherAnswer = otherButton.nextElementSibling;
        const otherIcon = otherButton.querySelector("i");
        otherAnswer.classList.add("hidden");
        otherIcon.style.transform = "rotate(0deg)";
        otherFaqItem.classList.remove("faq-active");
        otherFaqItem.style.borderColor = "";
        otherFaqItem.style.boxShadow = "";
      }
    });
  });
});

// Careers dropdown items toggle
document.querySelectorAll(".career-dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      const content = item.querySelector("div:nth-child(2)");
      const icon = item.querySelector("i");
      content.classList.toggle("hidden");
      icon.style.transform = content.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(90deg)";
    }
  });
});

// Vertical nav dot activation
const sections = document.querySelectorAll("section[id]");
const navDots = document.querySelectorAll(".nav-dot");

function updateActiveNavDot() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navDots.forEach((dot) => {
    dot.classList.remove("active");
    const href = dot.getAttribute("href").substring(1);
    if (href === current) {
      dot.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavDot);


// Scroll to form with position pre-filled
window.scrollToForm = (position) => {
  const formElement = document.getElementById("application-form");
  const positionSelect = document.getElementById("position");

  if (positionSelect) {
    positionSelect.value = position;
  }

  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }

  // Close mobile menu if open
  if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
};

// Job Cards Collapsible Functionality
document.querySelectorAll(".job-header").forEach((button) => {
  button.addEventListener("click", () => {
    const jobItem = button.closest(".job-item");
    const details = button.nextElementSibling;
    const icon = button.querySelector('i[data-lucide="chevron-down"]');

    // Toggle current job details
    const isHidden = details.classList.contains("hidden");
    details.classList.toggle("hidden");

    // Rotate chevron icon
    if (icon) {
      icon.style.transform = details.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(180deg)";
    }

    // Add/remove active border
    if (isHidden) {
      jobItem.classList.add("faq-active");
      jobItem.style.borderColor = "#FFD02B";
      jobItem.style.boxShadow = "0 0 20px rgba(255, 208, 43, 0.1)";
    } else {
      jobItem.classList.remove("faq-active");
      jobItem.style.borderColor = "";
      jobItem.style.boxShadow = "";
    }

    // Close other job details
    document.querySelectorAll(".job-header").forEach((otherButton) => {
      if (otherButton !== button) {
        const otherJobItem = otherButton.closest(".job-item");
        const otherDetails = otherButton.nextElementSibling;
        const otherIcon = otherButton.querySelector(
          'i[data-lucide="chevron-down"]'
        );

        otherDetails.classList.add("hidden");
        if (otherIcon) {
          otherIcon.style.transform = "rotate(0deg)";
        }
        otherJobItem.classList.remove("faq-active");
        otherJobItem.style.borderColor = "";
        otherJobItem.style.boxShadow = "";
      }
    });
  });
});