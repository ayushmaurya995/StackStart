const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = Array.from(document.querySelectorAll(".course-card"));
const searchInput = document.getElementById("courseSearch");
const courseCount = document.getElementById("courseCount");
const faqItems = document.querySelectorAll(".faq-item");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode")
    ? "Light mode"
    : "Dark mode";
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    updateCourses();
  });
});

searchInput.addEventListener("input", updateCourses);

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const symbol = item.querySelector(".faq-symbol");

  const syncSymbol = () => {
    symbol.textContent = item.classList.contains("open") ? "-" : "+";
  };

  syncSymbol();

  button.addEventListener("click", () => {
    item.classList.toggle("open");
    syncSymbol();
  });
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function updateCourses() {
  const activeFilter =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const haystack = card.textContent.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesFilter =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesQuery && matchesFilter;

    card.style.display = isVisible ? "grid" : "none";
    if (isVisible) visibleCount += 1;
  });

  if (activeFilter === "all" && !query) {
    courseCount.textContent = `Showing all ${visibleCount} courses`;
    return;
  }

  courseCount.textContent = `Showing ${visibleCount} course${visibleCount === 1 ? "" : "s"}`;
}

updateCourses();
