// header-section.js
// GSAP and SVG Animate Intro Effects
window.onload = function() {
  // Reveal hero headline & CTA
  gsap.from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.3
  });
  gsap.from(".cta-btn", {
    y: 60,
    opacity: 0,
    duration: 1.1,
    stagger: 0.18,
    ease: "power3.out",
    delay: 0.85
  });
  gsap.from(".hero-image img", {
    scale: 0.92,
    opacity: 0,
    duration: 1.08,
    ease: "expo.out",
    delay: 0.7
  });
  // Animated SVG circles
  gsap.to("#animated-bg svg circle", {
    strokeDashoffset: -1800,
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "power1.inOut",
    stagger: 0.55
  });
};

/* 
File organization:
- header-section.html
- header-section.css
- header-section.js

Animation logic:
- GSAP animates headline, cta's, image for reveal-on-load
- SVG circles animate in gentle loop for motion background
- Parallax movement and color changes can be enhanced in JS as desired
*/
