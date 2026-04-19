// 1. Lógica del Modo Oscuro (Dark Mode Toggle)
const themeToggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Comprobar si el usuario ya había elegido el modo oscuro antes
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggleBtn.innerText = "☀️ Light Mode";
}

// Evento al hacer clic en el botón
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

// 2. Animaciones al hacer Scroll (Intersection Observer)
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.15, // El elemento aparece cuando el 15% es visible en pantalla
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll,
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target); // Deja de observar una vez que ha aparecido
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
