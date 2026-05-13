const orb = document.querySelector(".alien-orb");

document.addEventListener("mousemove", (e) => {
  orb.style.left = e.clientX + "px";
  orb.style.top = e.clientY + "px";
});

const form = document.getElementById("alienForm");
const popup = document.getElementById("alienPopup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  await fetch(form.action, {
    method: "POST",
    body: data,
  });

  popup.classList.add("active");

  form.reset();
});

function closePopup() {
  popup.classList.remove("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  document.body.classList.toggle("mobile-nav-active");
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});

const orb1 = document.querySelector(".parallax-orb.one");
const orb2 = document.querySelector(".parallax-orb.two");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orb1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;

  orb2.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
});

document.addEventListener(
  "touchmove",
  (e) => {
    const touch = e.touches[0];

    const x = touch.clientX / window.innerWidth;
    const y = touch.clientY / window.innerHeight;

    orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;

    orb2.style.transform = `translate(-${x * 35}px, -${y * 35}px)`;
  },
  { passive: true },
);
