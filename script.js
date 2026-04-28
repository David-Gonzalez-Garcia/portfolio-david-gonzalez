// 1. Lógica del Modo Oscuro
const themeToggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggleBtn.innerText = "☀️ Light Mode";
}

themeToggleBtn.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggleBtn.innerText = "🌙 Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggleBtn.innerText = "☀️ Light Mode";
  }
});

// 2. Animaciones Scrollytelling (Aparición al hacer scroll)
const scrollyElements = document.querySelectorAll(".scrolly-element");

const observerOptions = {
  threshold: 0.15, // El bloque aparece cuando asoma el 15% en pantalla
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollyElements.forEach((el) => {
  scrollObserver.observe(el);
});

// 3. Efecto Parallax en el Fondo al hacer Scroll
const parallaxBg = document.getElementById("parallax-bg");

window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;
  // Mueve los círculos del fondo a distinta velocidad que la pantalla
  parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Forzar la aparición del Hero Section al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero.scrolly-element");
  if (hero) {
    hero.classList.add("visible");
  }
});

// 4. Efecto 3D Tilt Dinámico para las tarjetas
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    // Calcula la posición del ratón en el centro de la tarjeta
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Cuanto más alejado del centro, mayor es la rotación (Max 5 grados)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    // Aplica la rotación a la tarjeta
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "transform 0.1s ease-out";
  });

  // Devuelve la tarjeta a su estado original cuando el ratón se va
  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    card.style.transition = "transform 0.5s ease-in-out";
  });
});
