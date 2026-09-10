document.addEventListener("DOMContentLoaded", () => {
  setupIcons();
  setupRatings();
  setupMobileMenu();
  setupCarousels();
  setupTestimonialSliders();
  updateYear();
});

const phosphorIconNames = {
  "arrow-right": "arrow-right",
  "chevron-left": "caret-left",
  "chevron-right": "caret-right",
  menu: "list",
  x: "x",
  sun: "sun",
  "shield-check": "shield-check",
  "trending-up": "trend-up",
  search: "magnifying-glass",
  wrench: "wrench",
  "badge-check": "seal-check",
  activity: "pulse",
  target: "target",
  heart: "heart",
  leaf: "leaf",
  home: "house-line",
  building: "buildings",
  factory: "factory",
  sprout: "plant",
  "clipboard-check": "clipboard-text",
  battery: "battery-charging",
  car: "car",
  gauge: "gauge",
  phone: "phone",
  mail: "envelope-simple",
  "map-pin": "map-pin",
  clock: "clock",
  instagram: "instagram-logo",
  facebook: "facebook-logo",
  linkedin: "linkedin-logo",
  youtube: "youtube-logo",
  star: "star",
};

function createIcon(name) {
  const icon = document.createElement("i");
  const phosphorName = phosphorIconNames[name] || name;

  icon.className = `icon ph ph-${phosphorName}`;
  icon.setAttribute("aria-hidden", "true");

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

function setupTestimonialSliders() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-testimonials]").forEach((slider) => {
    const viewport = slider.querySelector(".testimonials-viewport");
    const track = slider.querySelector(".testimonials-track");
    const slides = Array.from(slider.querySelectorAll(".testimonial-slide"));
    const previous = slider.querySelector("[data-testimonial-previous]");
    const next = slider.querySelector("[data-testimonial-next]");
    const dotsContainer = slider.querySelector("[data-testimonial-dots]");
    let currentIndex = 0;
    let timer;
    let dragStartX = null;
    let dragDistance = 0;
    let resizeFrame;
    let pointerInside = false;
    let focusInside = false;

    if (!viewport || !track || slides.length === 0) return;

    function slidesPerView() {
      const value = Number.parseInt(getComputedStyle(track).getPropertyValue("--testimonials-per-view"), 10);
      return Number.isFinite(value) ? value : 1;
    }

    function lastIndex() {
      return Math.max(0, slides.length - slidesPerView());
    }

    function stopTimer() {
      window.clearInterval(timer);
    }

    function startTimer() {
      stopTimer();
      if (
        prefersReducedMotion.matches ||
        lastIndex() === 0 ||
        document.hidden ||
        pointerInside ||
        focusInside ||
        dragStartX !== null
      ) return;
      timer = window.setInterval(() => showSlide(currentIndex + 1, false), 5000);
    }

    function updateSlideState() {
      const visibleUntil = currentIndex + slidesPerView();
      slides.forEach((slide, index) => {
        const isVisible = index >= currentIndex && index < visibleUntil;
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");
        slide.setAttribute("aria-hidden", String(!isVisible));
        slide.setAttribute("aria-label", `Depoimento ${index + 1} de ${slides.length}`);
      });
    }

    function updateDots() {
      slider.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function translateTrack(distance = 0) {
      const offset = slides[currentIndex]?.offsetLeft || 0;
      track.style.transform = `translate3d(${distance - offset}px, 0, 0)`;
    }

    function showSlide(index, restart = true) {
      const totalPositions = lastIndex() + 1;
      currentIndex = (index + totalPositions) % totalPositions;
      track.classList.remove("dragging");
      viewport.classList.remove("dragging");
      translateTrack();
      updateSlideState();
      updateDots();
      if (restart) startTimer();
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.replaceChildren();
      for (let index = 0; index <= lastIndex(); index += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "testimonial-dot";
        dot.setAttribute("aria-label", `Mostrar grupo de depoimentos ${index + 1}`);
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
      }
    }

    function finishDrag() {
      if (dragStartX === null) return;
      const targetIndex = Math.abs(dragDistance) > 48
        ? currentIndex + (dragDistance < 0 ? 1 : -1)
        : currentIndex;
      dragStartX = null;
      dragDistance = 0;
      showSlide(targetIndex);
    }

    previous?.addEventListener("click", () => showSlide(currentIndex - 1));
    next?.addEventListener("click", () => showSlide(currentIndex + 1));

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(currentIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentIndex + 1);
      }
    });

    viewport.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      dragStartX = event.clientX;
      dragDistance = 0;
      stopTimer();
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("dragging");
      track.classList.add("dragging");
    });

    viewport.addEventListener("pointermove", (event) => {
      if (dragStartX === null) return;
      dragDistance = event.clientX - dragStartX;
      translateTrack(dragDistance);
    });

    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);
    slider.addEventListener("mouseenter", () => {
      pointerInside = true;
      stopTimer();
    });
    slider.addEventListener("mouseleave", () => {
      pointerInside = false;
      startTimer();
    });
    slider.addEventListener("focusin", () => {
      focusInside = true;
      stopTimer();
    });
    slider.addEventListener("focusout", (event) => {
      if (!slider.contains(event.relatedTarget)) {
        focusInside = false;
        startTimer();
      }
    });

    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        currentIndex = Math.min(currentIndex, lastIndex());
        buildDots();
        showSlide(currentIndex);
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    prefersReducedMotion.addEventListener?.("change", startTimer);
    buildDots();
    showSlide(0);
  });
}

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}
