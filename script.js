/* ==========================================================
   CONFIGURAÇÕES FÁCEIS
   Preencha estes dois valores quando tiver os dados reais.
   ========================================================== */
const WHATSAPP_NUMBER = ""; // Exemplo: "5511999990000"
const CRM_EMBED_URL = ""; // Cole a URL de incorporação do formulário do CRM

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupCarousels();
  setupForms();
  setupCrmEmbed();
  updateYear();
});

function setupMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "×" : "☰";
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
      document.body.classList.remove("menu-open");
    });
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

function setupForms() {
  document.querySelectorAll(".crm-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!WHATSAPP_NUMBER) {
        showToast(
          "O formulário está pronto. Preencha WHATSAPP_NUMBER no arquivo script.js para ativar o envio.",
        );
        return;
      }

      const data = new FormData(form);
      const message = [
        "Novo pedido pelo site",
        "",
        "Nome: " + data.get("nome"),
        "E-mail: " + data.get("email"),
        "Telefone: " + data.get("telefone"),
        "Conta de luz: " + data.get("conta"),
        "Tipo: " + data.get("tipo"),
        "Mensagem: " + (data.get("mensagem") || "Não informado"),
      ].join("\n");

      const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

      window.open(url, "_blank", "noopener,noreferrer");
      form.reset();
      showToast("Pedido preparado. O WhatsApp foi aberto em uma nova janela.");
    });
  });
}

function setupCrmEmbed() {
  if (!CRM_EMBED_URL) return;

  document.querySelectorAll(".crm-slot").forEach((slot) => {
    const iframe = document.createElement("iframe");
    iframe.src = CRM_EMBED_URL;
    iframe.title = "Formulário de contato";
    iframe.loading = "lazy";
    iframe.style.width = "100%";
    iframe.style.height = "640px";
    iframe.style.border = "0";
    iframe.style.borderRadius = "20px";

    slot.replaceChildren(iframe);
  });
}

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}
