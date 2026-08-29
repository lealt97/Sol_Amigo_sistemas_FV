document.addEventListener("DOMContentLoaded", () => {
  setupIcons();
  setupRatings();
  setupMobileMenu();
  setupCarousels();
  updateYear();
});

const iconSprite = "assets/icons.svg";

function createIcon(name) {
  const namespace = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(namespace, "svg");
  const use = document.createElementNS(namespace, "use");

  icon.classList.add("icon");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  use.setAttribute("href", `${iconSprite}#${name}`);
  icon.appendChild(use);

  return icon;
}

function renderIcon(element, name) {
  element.dataset.icon = name;
  element.replaceChildren(createIcon(name));
}

function setupIcons() {
  document.querySelectorAll("[data-icon]").forEach((element) => {
    renderIcon(element, element.dataset.icon);
  });
}

function setupRatings() {
  document.querySelectorAll("[data-rating]").forEach((rating) => {
    const total = Number(rating.dataset.rating) || 5;
    rating.replaceChildren(...Array.from({ length: total }, () => createIcon("star")));
  });
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    const menuIcon = button.querySelector("[data-menu-icon]");
    if (menuIcon) renderIcon(menuIcon, isOpen ? "x" : "menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
      const menuIcon = button.querySelector("[data-menu-icon]");
      if (menuIcon) renderIcon(menuIcon, "menu");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && menu.classList.contains("open")) {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Abrir menu");
      const menuIcon = button.querySelector("[data-menu-icon]");
      if (menuIcon) renderIcon(menuIcon, "menu");
      document.body.classList.remove("menu-open");
    }
  });
}

function setupCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".project-slide"));
    const previous = carousel.querySelector("[data-previous]");
    const next = carousel.querySelector("[data-next]");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    let currentIndex = 0;
    let timer;

    if (!track || slides.length === 0) return;

    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Ir para o projeto " + (index + 1));
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer?.appendChild(dot);
    });

    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + currentIndex * 100 + "%)";
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentIndex);
      });
      restartTimer();
    }

    function restartTimer() {
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(currentIndex + 1), 6000);
    }

    previous?.addEventListener("click", () => showSlide(currentIndex - 1));
    next?.addEventListener("click", () => showSlide(currentIndex + 1));

    carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
    carousel.addEventListener("mouseleave", restartTimer);

    showSlide(0);
  });
}

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}
