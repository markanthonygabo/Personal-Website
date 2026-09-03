document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile nav toggle */
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Compose modal */
const RECIPIENT_EMAIL = "markanthonymgabo@gmail.com";

const backdrop = document.getElementById("modal-backdrop");
const form = document.getElementById("contact-form");
let lastFocused = null;

function openModal() {
  lastFocused = document.activeElement;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  const firstField = document.getElementById("cf-name");
  if (firstField) firstField.focus();
}

function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll("[data-open-modal]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !backdrop.hidden) closeModal();
});

/* Experience / leadership tabs */
const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".accordion[data-panel]");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.tab;
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== target;
    });
  });
});

/* Accordion timeline items (single-open per panel) */
document.querySelectorAll(".timeline-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".timeline-item");
    const panel = item.closest(".accordion");
    const wasOpen = item.classList.contains("is-open");
    panel.querySelectorAll(".timeline-item.is-open").forEach((openItem) => {
      openItem.classList.remove("is-open");
    });
    if (!wasOpen) item.classList.add("is-open");
  });
});

/* Gallery lightbox */
(function galleryLightbox() {
  const backdrop = document.getElementById("lightbox-backdrop");
  const lightboxImg = document.getElementById("lightbox-image");
  if (!backdrop || !lightboxImg) return;

  document.querySelectorAll(".gallery-tile img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    backdrop.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLightbox();
  });

  document.querySelectorAll("[data-close-lightbox]").forEach((btn) => {
    btn.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !backdrop.hidden) closeLightbox();
  });
})();

/* Featured gallery carousel */
(function galleryCarousel() {
  const track = document.getElementById("gallery-track");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  if (!track || !prevBtn || !nextBtn) return;

  function scrollByOne(direction) {
    const tile = track.querySelector(".gallery-tile");
    if (!tile) return;
    const gap = 20;
    const distance = tile.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByOne(-1));
  nextBtn.addEventListener("click", () => scrollByOne(1));
})();

/* Hero network canvas animation */
(function heroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 130;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width + 80;
    height = canvas.height = rect.height + 80;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(200, 30, 58, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      ctx.fillStyle = "rgba(245, 243, 240, 0.55)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  makeNodes();
  step();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      makeNodes();
      if (prefersReducedMotion) step();
    }, 200);
  });
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const message = document.getElementById("cf-message").value.trim();

  const subject = `Portfolio message from ${name}`;
  const body = `${message}\n\n—\nFrom: ${name}\nReply to: ${email}`;

  const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  form.reset();
  closeModal();
});
