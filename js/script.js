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
// Replace with your real Formspree endpoint (formspree.io) after creating a free form there.
// Until replaced, submissions fall back to opening the visitor's own email app.
const FORM_ENDPOINT = "https://formspree.io/f/xgaeqqyk";

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

/* Accessibility panel */
(function a11yPanel() {
  const fab = document.getElementById("a11y-toggle");
  const panel = document.getElementById("a11y-panel");
  const closeBtn = document.getElementById("a11y-close");
  const sizeBtns = document.querySelectorAll(".a11y-size-btn");
  const motionToggle = document.getElementById("a11y-motion");
  const underlineToggle = document.getElementById("a11y-underline");
  const resetBtn = document.getElementById("a11y-reset");
  if (!fab || !panel) return;

  function applySize(scale) {
    document.documentElement.style.zoom = scale;
    localStorage.setItem("a11y-text-scale", scale);
    sizeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.size === String(scale));
    });
  }

  function applyMotion(on) {
    document.documentElement.classList.toggle("force-reduce-motion", on);
    localStorage.setItem("a11y-motion", on ? "true" : "false");
    window.dispatchEvent(new CustomEvent("themechange"));
  }

  function applyUnderline(on) {
    document.documentElement.classList.toggle("underline-links", on);
    localStorage.setItem("a11y-underline", on ? "true" : "false");
  }

  // Reflect saved state in the panel controls
  const savedScale = localStorage.getItem("a11y-text-scale") || "1";
  sizeBtns.forEach((btn) => btn.classList.toggle("active", btn.dataset.size === savedScale));
  motionToggle.checked = localStorage.getItem("a11y-motion") === "true";
  underlineToggle.checked = localStorage.getItem("a11y-underline") === "true";

  fab.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
  });

  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
  });

  document.addEventListener("click", (e) => {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
      panel.hidden = true;
    }
  });

  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => applySize(btn.dataset.size));
  });

  motionToggle.addEventListener("change", () => applyMotion(motionToggle.checked));
  underlineToggle.addEventListener("change", () => applyUnderline(underlineToggle.checked));

  resetBtn.addEventListener("click", () => {
    applySize("1");
    applyMotion(false);
    applyUnderline(false);
    motionToggle.checked = false;
    underlineToggle.checked = false;
  });
})();

/* Theme toggle */
(function themeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  });
})();

/* Cookie consent + gated analytics */
(function cookieConsent() {
  const KEY = "cookie-consent";
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  function loadAnalytics() {
    const id = window.GA_MEASUREMENT_ID;
    if (!id || id.indexOf("XXXX") !== -1) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", id);
  }

  const stored = localStorage.getItem(KEY);
  if (stored === "accepted") {
    loadAnalytics();
  } else if (stored !== "declined") {
    banner.hidden = false;
  }

  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem(KEY, "accepted");
      banner.hidden = true;
      loadAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem(KEY, "declined");
      banner.hidden = true;
    });
  }
})();

/* Timeline: scroll-drawn connecting line */
(function timelineDrawLine() {
  const timelines = document.querySelectorAll(".timeline");
  if (!timelines.length) return;

  function update() {
    const viewportH = window.innerHeight;
    timelines.forEach((ol) => {
      if (ol.offsetParent === null) return; // hidden (inactive tab)
      const rect = ol.getBoundingClientRect();
      const total = rect.height + viewportH * 0.6;
      const scrolled = viewportH * 0.85 - rect.top;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      ol.style.setProperty("--progress", progress.toFixed(3));
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Re-check when switching Professional / Leadership tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTimeout(update, 50));
  });

  update();
})();

/* Scroll reveal + stat count-up (subtle motion, finance-appropriate) */
(function scrollEffects() {
  const isReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("force-reduce-motion");

  const revealSelectors = [
    ".quote-feature",
    ".award-image",
    ".award-content",
    ".edu-card",
    ".cert-card",
    ".wallet-card",
    ".timeline-item",
    ".gallery-tile",
    ".about-image",
    ".about-text",
    ".stat",
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(","));
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    // Small stagger for items that share a parent (grids, lists)
    const siblingsSameType = Array.from(el.parentElement.children).filter((c) =>
      c.classList.contains(el.classList[0])
    );
    const idx = siblingsSameType.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${Math.min(idx * 90, 360)}ms`;
  });

  if (isReducedMotion() || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Stat row count-up
  const statNumbers = document.querySelectorAll(".stat-number");
  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";
    if (isReducedMotion()) return;
    const duration = 900;
    const start = performance.now();
    el.classList.add("counting");
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current + (progress >= 1 ? suffix : "");
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (statNumbers.length && "IntersectionObserver" in window) {
    const statIo = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => statIo.observe(el));
  }
})();

/* Marquees: auto-scroll, click/tap to pause + resume after 3s, draggable */
(function initMarquees() {
  function isReducedMotionActive() {
    return (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("force-reduce-motion")
    );
  }

  document.querySelectorAll(".marquee-track").forEach((track) => {
    const isCert = !!track.closest(".cert-marquee");
    const speed = isCert ? 0.45 : 0.55;

    let offset = 0;
    let paused = false;
    let resumeTimer = null;
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let moved = false;

    function halfWidth() {
      return track.scrollWidth / 2;
    }

    function applyTransform() {
      track.style.transform = `translateX(${-offset}px)`;
    }

    function wrap() {
      const hw = halfWidth();
      if (hw > 0) offset = ((offset % hw) + hw) % hw;
    }

    function scheduleResume() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2000);
    }

    function tick() {
      if (!paused && !isReducedMotionActive()) {
        offset += speed;
        wrap();
        applyTransform();
      }
      requestAnimationFrame(tick);
    }

    track.addEventListener("pointerdown", (e) => {
      dragging = true;
      moved = false;
      dragStartX = e.clientX;
      dragStartOffset = offset;
      paused = true;
      clearTimeout(resumeTimer);
      track.setPointerCapture(e.pointerId);
    });

    track.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 3) moved = true;
      offset = dragStartOffset - dx;
      wrap();
      applyTransform();
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      scheduleResume();
    }

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", () => {
      if (dragging) endDrag();
    });

    // A plain tap/click (no drag) also pauses, then resumes after 3s
    track.addEventListener("click", () => {
      if (moved) return;
      paused = true;
      scheduleResume();
    });

    requestAnimationFrame(tick);
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

/* Hero scroll zoom effect */
(function heroScrollZoom() {
  const heroImg = document.querySelector(".hero-image img");
  const heroSection = document.querySelector(".hero");
  if (!heroImg || !heroSection) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("force-reduce-motion");
  if (prefersReducedMotion) return;

  let ticking = false;

  function updateZoom() {
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    const scale = 1 + progress * 0.14;
    heroImg.style.transform = `scale(${scale})`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateZoom);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateZoom();
})();

/* Hero network canvas animation */
(function heroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const osReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function isReducedMotionNow() {
    return osReducedMotion || document.documentElement.classList.contains("force-reduce-motion");
  }

  let width, height, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 130;

  function colors() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return isDark
      ? { line: "200, 30, 58", dot: "245, 243, 240", dotAlpha: 0.55 }
      : { line: "22, 38, 79", dot: "15, 27, 45", dotAlpha: 0.45 };
  }

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

  let animating = true;

  function step() {
    ctx.clearRect(0, 0, width, height);
    const c = colors();

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
          ctx.strokeStyle = `rgba(${c.line}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      ctx.fillStyle = `rgba(${c.dot}, ${c.dotAlpha})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!isReducedMotionNow()) {
      animating = true;
      requestAnimationFrame(step);
    } else {
      animating = false;
    }
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
      if (isReducedMotionNow()) step();
    }, 200);
  });

  window.addEventListener("themechange", () => {
    if (!animating) step();
  });
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const honeypot = document.getElementById("cf-company");
  if (honeypot && honeypot.value.trim() !== "") {
    form.reset();
    closeModal();
    return;
  }

  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const message = document.getElementById("cf-message").value.trim();
  const statusEl = document.getElementById("modal-status");
  const submitBtn = document.getElementById("modal-submit-btn");

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.hidden = false;
    statusEl.classList.toggle("modal-status-error", !!isError);
  }

  function fallbackToMailto() {
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\nFrom: ${name}\nReply to: ${email}`;
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.reset();
    closeModal();
  }

  // Endpoint not set up yet: fall back to opening the visitor's email app.
  if (!FORM_ENDPOINT || FORM_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
    fallbackToMailto();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  })
    .then((res) => {
      if (res.ok) {
        showStatus("Message sent. Thanks for reaching out!", false);
        form.reset();
        setTimeout(closeModal, 1600);
      } else {
        showStatus("Something went wrong. Opening your email app instead...", true);
        setTimeout(fallbackToMailto, 1200);
      }
    })
    .catch(() => {
      showStatus("Couldn't reach the server. Opening your email app instead...", true);
      setTimeout(fallbackToMailto, 1200);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    });
});
