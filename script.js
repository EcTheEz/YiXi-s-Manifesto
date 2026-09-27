/* ==========================================================================
   YI XI — MANIFESTO 2026
   Vanilla JS. No frameworks, no build step, no external requests.
   ========================================================================== */

/* ---------------------------------------------------------------------
   EDITABLE CONTENT
   Update statuses here as proposals move through discussion.
   Allowed status values: "proposed", "discussion", "implemented", "notApproved"
   --------------------------------------------------------------------- */
const MANIFESTO_CONTENT = {
  // Replace with your Google Forms URL when ready, e.g. "https://forms.gle/xxxxxxx"
  FEEDBACK_FORM_URL: "",

  proposals: [
    { title: "Student Voice", status: "proposed" },
    { title: "Learning — Rethinking Homework Club", status: "proposed" },
    { title: "School Improvement", status: "proposed" },
    { title: "Representation", status: "proposed" }
  ]
};

const STATUS_META = {
  proposed:    { emoji: "🟡", label: "Proposed",     class: "status-proposed" },
  discussion:  { emoji: "🟠", label: "In discussion", class: "status-discussion" },
  implemented: { emoji: "🟢", label: "Implemented",   class: "status-implemented" },
  notApproved: { emoji: "🔴", label: "Not approved",  class: "status-notapproved" }
};

/* ---------------------------------------------------------------------
   Navigation: mobile menu toggle
   --------------------------------------------------------------------- */
(function setUpNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after choosing a link (mobile only).
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ---------------------------------------------------------------------
   Proposal cards: expand / collapse
   --------------------------------------------------------------------- */
(function setUpCards() {
  const cards = document.querySelectorAll("[data-card]");

  cards.forEach((card) => {
    const head = card.querySelector(".card-head");
    const body = card.querySelector(".card-body");
    if (!head || !body) return;

    head.addEventListener("click", () => {
      const isOpen = card.hasAttribute("data-open");

      if (isOpen) {
        card.removeAttribute("data-open");
        head.setAttribute("aria-expanded", "false");
        body.style.maxHeight = "0px";
      } else {
        card.setAttribute("data-open", "");
        head.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // Keep open cards correctly sized if the viewport changes (e.g. rotation).
  window.addEventListener("resize", () => {
    document.querySelectorAll("[data-card][data-open] .card-body").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });
})();

/* ---------------------------------------------------------------------
   Progress tracker: render from MANIFESTO_CONTENT
   --------------------------------------------------------------------- */
(function renderProgress() {
  const list = document.getElementById("progress-list");
  if (!list) return;

  MANIFESTO_CONTENT.proposals.forEach((item) => {
    const meta = STATUS_META[item.status] || STATUS_META.proposed;

    const li = document.createElement("li");
    li.className = "progress-item";
    li.setAttribute("data-just-set", "");

    const badge = document.createElement("span");
    badge.className = "progress-badge " + meta.class;
    badge.textContent = meta.emoji + " " + meta.label.toUpperCase();

    const title = document.createElement("span");
    title.className = "progress-title";
    title.textContent = item.title;

    li.appendChild(badge);
    li.appendChild(title);
    list.appendChild(li);
  });
})();

/* ---------------------------------------------------------------------
   Feedback button: point at the Google Forms URL once set
   --------------------------------------------------------------------- */
(function setUpFeedback() {
  const button = document.getElementById("feedback-btn");
  const hint = document.getElementById("feedback-hint");
  if (!button) return;

  if (MANIFESTO_CONTENT.FEEDBACK_FORM_URL) {
    button.href = MANIFESTO_CONTENT.FEEDBACK_FORM_URL;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else if (hint) {
    hint.hidden = false;
    button.addEventListener("click", (event) => event.preventDefault());
  }
})();

/* ---------------------------------------------------------------------
   Scroll reveal for section headings and cards
   --------------------------------------------------------------------- */
(function setUpReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".section-head, [data-card], .progress-item, .promise-step");

  targets.forEach((el) => el.classList.add("reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
})();
