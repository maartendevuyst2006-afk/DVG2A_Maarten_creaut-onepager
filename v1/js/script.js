// Creative Automation – v1
// Markeert in de navigatie de sectie die op dat moment in beeld is.

const navLinks = document.querySelectorAll(".nav-list a");
const sections = document.querySelectorAll(".chapter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        if (isCurrent) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));
