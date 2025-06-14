
const projects = [
  {
    title: "Weather App",
    description: "Live weather updates with SVG animations.",
    image: "img/weather.jpg",
    live: "/weather-app/",
    repo: "https://github.com/GorgeDimancev/Portfolio.git"
  },
  {
    title: "Budget App",
    description: "Track expenses with filters and charts.",
    image: "img/budget.jpg",
    live: "/budget-app/",
    repo: "https://github.com/GorgeDimancev/Portfolio.git"
  },
  {
    title: "E-commerce Shop",
    description: "Modern React store with product filtering.",
    image: "img/shop.jpg",
    live: "/ecommerce-shop/",
    repo: "https://github.com/GorgeDimancev/Portfolio.git"
  },
  {
    title: "Netflix Clone",
    description: "Movie browser UI with real API integration.",
    image: "img/netflix.jpg",
    live: "/netflix-clone/",
    repo: "https://github.com/GorgeDimancev/Portfolio.git"
  }
];

const container = document.getElementById("projects");

projects.forEach(proj => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${proj.image}" alt="${proj.title}">
    <div class="project-content">
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <a href="${proj.live}" class="btn" target="_blank">Live Project</a>
      <a href="${proj.repo}" class="btn" target="_blank">Source Code</a>
    </div>
  `;
  container.appendChild(card);
});


document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("active");
});
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links").classList.remove("active");
  });
});
