document.addEventListener("DOMContentLoaded", () => {
  setupIcons();
  setupRatings();
  setupMobileMenu();
  setupCarousels();
  setupFeedbackMarquees();
  setupScrollAnimations();
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

function setupFeedbackMarquees() {
  const marquees = document.querySelectorAll("[data-feedback-marquee]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  marquees.forEach((marquee) => {
    const track = marquee.querySelector(".testimonial-grid");
    const cards = Array.from(track?.children || []);

    cards.forEach((card, index) => {
      card.setAttribute("role", "group");
      card.setAttribute("aria-label", `Depoimento ${index + 1} de ${cards.length}`);
    });

    if (!track || cards.length === 0 || prefersReducedMotion) return;

    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("aria-label");
      clone.dataset.feedbackClone = "";
      clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      track.appendChild(clone);
    });

    marquee.classList.add("is-ready");
  });
}

function setupScrollAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const preparedElements = new Set();

  function prepare(element, variant = "up", delay = 0) {
    if (!element || preparedElements.has(element)) return;

    preparedElements.add(element);
    element.classList.add("scroll-reveal", `scroll-reveal--${variant}`);
    element.style.setProperty("--scroll-reveal-delay", `${Math.min(delay, 360)}ms`);
  }

  function finish(element) {
    const delay = Number.parseInt(element.style.getPropertyValue("--scroll-reveal-delay"), 10) || 0;

    element.classList.add("is-revealed");
    window.setTimeout(() => {
      element.classList.remove("scroll-reveal", "scroll-reveal--up", "scroll-reveal--left", "scroll-reveal--right", "scroll-reveal--soft", "is-revealed");
      element.style.removeProperty("--scroll-reveal-delay");
    }, 900 + delay);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      finish(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  document.querySelectorAll(".hero-content > :not(.stats), .page-hero .container > *").forEach((element, index) => {
    prepare(element, "up", index * 85);
  });

  document.querySelectorAll("main .section").forEach((section) => {
    section.querySelectorAll(".eyebrow, .section-title, .section-lead").forEach((element, index) => {
      if (element.closest(".story-copy, .budget-copy, .callout")) return;
      prepare(element, "up", index * 70);
    });
  });

  const staggeredGroups = [
    ".stats",
    ".benefit-grid",
    ".steps",
    ".value-grid",
    ".service-grid",
    ".service-extra-grid",
    ".gallery-grid",
    ".contact-list",
  ];

  staggeredGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      Array.from(group.children).forEach((element, index) => {
        prepare(element, "up", index * 90);
      });
    });
  });

  document.querySelectorAll(".story-copy, .budget-copy").forEach((element) => prepare(element, "left"));
  document.querySelectorAll(".story-image, .crm-slot, .map").forEach((element) => prepare(element, "right"));
  document.querySelectorAll(".projects[data-carousel] > .container, .testimonial-marquee, .callout").forEach((element) => prepare(element, "soft"));

  document.querySelectorAll(".site-footer .footer-grid > *").forEach((element, index) => {
    prepare(element, "up", index * 80);
  });
  document.querySelectorAll(".site-footer .footer-bottom").forEach((element) => prepare(element, "up", 160));

  preparedElements.forEach((element) => {
    if (element.closest(".hero, .page-hero")) return;
    observer.observe(element);
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      preparedElements.forEach((element) => {
        if (element.closest(".hero, .page-hero")) finish(element);
      });
    });
  });
}

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}
