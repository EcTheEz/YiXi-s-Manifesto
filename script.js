/* ==========================================================================
   YI XI — MANIFESTO 2026
   Vanilla JS. No frameworks, no build step, no external requests.

   Layout of this file:
   1. EDIT YOUR PROPOSALS HERE   — the three manifesto proposals
   2. EDIT SITE CONTENT HERE     — headline, How I Work, timeline
   3. EDITABLE CAMPAIGN SETTINGS — your feedback form link
   4. Everything below "SITE FUNCTIONALITY" renders and wires up the
      page from the content above. You shouldn't need to touch it.
   ========================================================================== */

/* =================================
   EDIT YOUR PROPOSALS HERE
   =================================
   Add, remove or reorder proposals by editing this array.
   Changing "status" updates the proposal card
   automatically.

   status: one of "PROPOSED", "DISCUSSION", "CONFIRMED", "IMPLEMENTED", "NOT APPROVED"
   mechanism: optional — an array of short steps shown as a flow (e.g. ["Post","Review","Respond"])
   note: optional — a short italic line shown under the description
*/
const proposals = [
  {
    number: "01",
    title: "STUDENT VOICE BOARD",
    status: "PROPOSED",
    description: "A physical board where students leave ideas, questions, school issues and suggestions on sticky notes. Council reviews submissions regularly and posts a response on the board itself, so it shows both what was asked and what happened next.",
    mechanism: ["Leave a note", "Review", "Respond", "Update the board"],
    note: "Requires school approval to set up and run."
  },
  {
    number: "02",
    title: "PRESENTATION CLUB",
    status: "PROPOSED",
    description: "A redesigned alternative to Homework Club, built around daily student-led presentations — a different presenter and topic each day, chosen through interviews, followed by a quiz and a task to demonstrate understanding.",
    mechanism: ["Present", "Quiz", "Task", "Prove understanding"],
    note: "A proposal to redesign Homework Club, not a promise that it will replace it — subject to school approval."
  },
  {
    number: "03",
    title: "STUCO WEBSITE",
    status: "PROPOSED",
    description: "A website for the Student Council committee to receive feedback, and for students to check on what we are working on.",
    note: "A proposal to open a website for Student Council — possibly requires funds."
  },
  {
    number: "04",
    title: "NASI LEMAK — TWICE A WEEK",
    status: "CONFIRMED",
    description: "Twice-weekly nasi lemak availability confirmed with the canteen.",
    note: "This is a confirmed arrangement for nasi lemak availability — not a claim that a wider canteen proposal has been formally approved by school leadership."
  }
];

/* =================================
   EDIT SITE CONTENT HERE
   =================================
   The main headline, How I Work section, and timeline steps.
*/
const SITE_CONTENT = {
  heroEyebrow: "Yi Xi · Manifesto 2026",
  // Use <br> for a manual line break, as below.
  heroHeadlineHTML: "Your voice<br>has value.",
  heroSub: "Listen. Act. Show the results.",

  about: {
    heading: "About Yi Xi",
    paragraphs: [
      "Hi, I\u2019m Yi Xi, and I\u2019m running for Student Council President for 2026.",
      "I want Student Council to be a place where students can raise ideas, questions and problems \u2014 and actually see what happens afterwards.",
      "My focus is simple: listen, act and report back.",
      "I want to turn student feedback into practical proposals, work with the relevant people to see what is possible, and keep students informed about the outcome \u2014 whether something is approved, still being discussed, or cannot be implemented.",
      "Through this website, I\u2019ve put my ideas, plans and progress in one place so students can understand what I\u2019m proposing and give their own feedback."
    ]
  },

  howIWork: {
    statement: "I get things done — simply, quickly, and clearly.",
    points: [
      { title: "Get to the point", description: "No unnecessary complications or beating around the bush." },
      { title: "Take action", description: "Turn student feedback into clear proposals and follow them through." },
      { title: "Keep it simple", description: "Make ideas practical, understandable and easy to act on." },
      { title: "Show the result", description: "Keep students updated on what happened, including when something cannot be approved." }
    ]
  },

  timeline: [
    "Idea",
    "Student feedback",
    "Proposal",
    "School / PTA discussion",
    "Decision",
    "Update students"
  ]
};

/* ================================
   EDITABLE CAMPAIGN SETTINGS
   ================================
   Paste your Microsoft Forms link below. Until you do, the feedback
   button shows a friendly message instead of navigating anywhere.
*/
const FEEDBACK_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=1EHqx3BYj0-UfvGGxtWf0jTcBCBtgwVDsNsmy9lNGnxUOVlKTTYzSU5RM01YTkFJNVpORVZESEVONi4u";

// Paste your school's official Student Council website below.
// Until you do, the footer link stays hidden rather than pointing nowhere.
const STUDENT_COUNCIL_URL = "PASTE-YOUR-STUDENT-COUNCIL-WEBSITE-HERE";


/* ==========================================================================
   SITE FUNCTIONALITY — rendering and interaction. Not usually edited.
   ========================================================================== */

const STATUS_META = {
  "PROPOSED":     { emoji: "🟡", label: "Proposed",      class: "status-proposed" },
  "DISCUSSION":   { emoji: "🟠", label: "In discussion",  class: "status-discussion" },
  "CONFIRMED":    { emoji: "🟢", label: "Confirmed",      class: "status-confirmed" },
  "IMPLEMENTED":  { emoji: "🟢", label: "Implemented",    class: "status-confirmed" },
  "NOT APPROVED": { emoji: "🔴", label: "Not approved",   class: "status-notapproved" }
};

function getStatusMeta(status) {
  return STATUS_META[status] || STATUS_META.PROPOSED;
}

/* ---------------------------------------------------------------------
   Hero content
   --------------------------------------------------------------------- */
(function renderHero() {
  const eyebrow = document.getElementById("hero-eyebrow");
  const headline = document.getElementById("hero-headline");
  const sub = document.getElementById("hero-sub");

  if (eyebrow) eyebrow.textContent = SITE_CONTENT.heroEyebrow;
  if (headline) headline.innerHTML = SITE_CONTENT.heroHeadlineHTML;
  if (sub) sub.textContent = SITE_CONTENT.heroSub;
})();

/* ---------------------------------------------------------------------
   Proposal cards — built from the `proposals` array
   --------------------------------------------------------------------- */
function renderProposalCards() {
  const container = document.getElementById("proposal-cards");
  if (!container) return;
  container.innerHTML = "";

  proposals.forEach((item) => {
    const meta = getStatusMeta(item.status);

    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("data-card", "");

    const head = document.createElement("button");
    head.className = "card-head";
    head.setAttribute("aria-expanded", "false");
    head.innerHTML =
      '<span class="card-number">' + item.number + "</span>" +
      '<span class="card-titles"><span class="card-title">' + item.title + "</span></span>" +
      '<span class="status-badge ' + meta.class + '">' + meta.emoji + " " + meta.label.toUpperCase() + "</span>" +
      '<span class="card-chevron" aria-hidden="true"></span>';

    const body = document.createElement("div");
    body.className = "card-body";

    let bodyHTML = "<p>" + item.description + "</p>";

    if (item.mechanism && item.mechanism.length) {
      bodyHTML += '<p class="card-label">How it would work</p><ol class="mechanism">' +
        item.mechanism.map((step) => "<li>" + step + "</li>").join("") +
        "</ol>";
    }

    if (item.note) {
      const noteClass = item.status === "CONFIRMED" || item.status === "IMPLEMENTED"
        ? "card-note card-note--confirmed"
        : "card-note";
      bodyHTML += '<p class="' + noteClass + '">' + item.note + "</p>";
    }

    body.innerHTML = bodyHTML;

    article.appendChild(head);
    article.appendChild(body);
    container.appendChild(article);
  });
}
renderProposalCards();

/* ---------------------------------------------------------------------
   About section — built from SITE_CONTENT.about
   --------------------------------------------------------------------- */
(function renderAbout() {
  const headingEl = document.getElementById("about-heading");
  const bodyEl = document.getElementById("about-body");
  if (headingEl) headingEl.textContent = SITE_CONTENT.about.heading;
  if (!bodyEl) return;

  bodyEl.innerHTML = "";
  SITE_CONTENT.about.paragraphs.forEach((text, index) => {
    const p = document.createElement("p");
    if (index === 0) p.className = "about-lead";
    p.textContent = text;
    bodyEl.appendChild(p);
  });
})();

/* ---------------------------------------------------------------------
   How I Work — built from SITE_CONTENT.howIWork
   --------------------------------------------------------------------- */
(function renderHowIWork() {
  const statementEl = document.getElementById("how-i-work-statement");
  const pointsEl = document.getElementById("how-i-work-points");
  if (statementEl) statementEl.textContent = SITE_CONTENT.howIWork.statement;
  if (!pointsEl) return;

  pointsEl.innerHTML = "";
  SITE_CONTENT.howIWork.points.forEach((point, index) => {
    const div = document.createElement("div");
    div.className = "promise-step";
    div.innerHTML =
      '<span class="promise-number">' + String(index + 1).padStart(2, "0") + "</span>" +
      "<h3>" + point.title + "</h3>" +
      "<p>" + point.description + "</p>";
    pointsEl.appendChild(div);
  });
})();

/* ---------------------------------------------------------------------
   Timeline — built from SITE_CONTENT.timeline
   --------------------------------------------------------------------- */
(function renderTimeline() {
  const timelineEl = document.getElementById("timeline");
  if (!timelineEl) return;

  timelineEl.innerHTML = "";
  SITE_CONTENT.timeline.forEach((step) => {
    const div = document.createElement("div");
    div.className = "timeline-step";
    div.setAttribute("role", "listitem");
    div.textContent = step;
    timelineEl.appendChild(div);
  });
})();

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

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ---------------------------------------------------------------------
   Proposal cards: expand / collapse (attached after cards are rendered)
   --------------------------------------------------------------------- */
function setUpCards() {
  document.querySelectorAll("[data-card]").forEach((card) => {
    const head = card.querySelector(".card-head");
    const body = card.querySelector(".card-body");
    if (!head || !body || head.dataset.bound) return;
    head.dataset.bound = "true";

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

  window.addEventListener("resize", () => {
    document.querySelectorAll("[data-card][data-open] .card-body").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });
}
setUpCards();

/* ---------------------------------------------------------------------
   Feedback button: point at FEEDBACK_URL once it's set.
   Placeholder or empty: don't navigate, just show a friendly message.
   --------------------------------------------------------------------- */
(function setUpFeedback() {
  const button = document.getElementById("feedback-btn");
  const hint = document.getElementById("feedback-hint");
  if (!button) return;

  const isPlaceholder = !FEEDBACK_URL || FEEDBACK_URL.indexOf("PASTE-YOUR") === 0;

  if (!isPlaceholder) {
    button.href = FEEDBACK_URL;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (hint) hint.hidden = false;
    });
  }
})();

/* ---------------------------------------------------------------------
   Student Council footer link: hidden until a real URL is set
   --------------------------------------------------------------------- */
(function setUpStudentCouncilLink() {
  const link = document.getElementById("stuco-link");
  if (!link) return;

  const isPlaceholder = !STUDENT_COUNCIL_URL || STUDENT_COUNCIL_URL.indexOf("PASTE-YOUR") === 0;

  if (isPlaceholder) {
    link.style.display = "none";
  } else {
    link.href = STUDENT_COUNCIL_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
})();

/* ---------------------------------------------------------------------
   Scroll reveal for section headings and cards
   --------------------------------------------------------------------- */
(function setUpReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".section-head, [data-card], .promise-step, .about-body");

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
