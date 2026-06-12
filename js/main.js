/* Site behavior: header state, mobile nav, scroll reveals, hero scene boot. */
import { initHeroScene } from "./scene.js";

document.documentElement.classList.add("js");

/* Sticky header tint */
const header = document.querySelector(".site-header");
function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Mobile navigation */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Mark current page in nav */
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((a) => {
  const target = a.getAttribute("href").split("/").pop();
  if (target === here) a.setAttribute("aria-current", "page");
});

/* Scroll-reveal */
const revealed = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealed.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-visible"));
}

/* Footer year */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Hero scene */
const sceneHost = document.querySelector("[data-scene]");
if (sceneHost) initHeroScene(sceneHost);

/* Contact form → opens the visitor's mail client with a composed message.
   To use a form service instead (e.g. Formspree), set the form's `action`
   and remove this handler — see README. */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Organization: ${data.get("organization") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Preferred contact: ${data.get("contact-method") || ""}`,
      `Best day/time: ${data.get("best-time") || ""}`,
      "",
      data.get("message") || "",
    ];
    const subject = encodeURIComponent("Inquiry from medreviewconsultants.com");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@medreviewconsultants.com?subject=${subject}&body=${body}`;
  });
}
