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



// Initialize Lucide icons
lucide.createIcons();



// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

