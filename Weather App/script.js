async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const info = document.getElementById("info");
  const svgContainer = document.getElementById("svgContainer");

  if (!city) {
    info.innerHTML = "<p>Please enter a city name.</p>";
    svgContainer.innerHTML = "";
    return;
  }

  const apiKey = "76df1c9ea06741c6855131349250606";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  info.innerHTML = "<p>Loading...</p>";
  svgContainer.innerHTML = "";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const condition = data.current.condition.text.toLowerCase();
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const icon = getSVG(condition);

    svgContainer.innerHTML = icon;
    info.innerHTML = `
      <p><strong>${data.location.name}, ${data.location.country}</strong></p>
      <p>${data.current.condition.text}</p>
      <p>${temp} °C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} km/h</p>
    `;
  } catch (err) {
    info.innerHTML = "<p>Could not fetch weather data.</p>";
    svgContainer.innerHTML = "";
  }
}

function getSVG(condition) {
  if (condition.includes("sun") || condition.includes("clear")) {
    return `
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="14" fill="gold">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite"/>
        </circle>
      </svg>`;
  }
  if (condition.includes("rain")) {
    return `
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="20" r="10" fill="gray"/>
        <line x1="24" y1="40" x2="24" y2="50" stroke="skyblue" stroke-width="3">
          <animate attributeName="y1" values="40;50;40" dur="0.6s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="50;60;50" dur="0.6s" repeatCount="indefinite"/>
        </line>
        <line x1="32" y1="40" x2="32" y2="50" stroke="skyblue" stroke-width="3">
          <animate attributeName="y1" values="40;50;40" dur="0.5s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="50;60;50" dur="0.5s" repeatCount="indefinite"/>
        </line>
      </svg>`;
  }
  if (condition.includes("snow")) {
    return `
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="20" r="10" fill="lightgray"/>
        <text x="28" y="50" font-size="24" fill="white">*</text>
        <text x="20" y="55" font-size="24" fill="white">*</text>
        <text x="36" y="55" font-size="24" fill="white">*</text>
      </svg>`;
  }
  if (condition.includes("cloud")) {
    return `
      <svg viewBox="0 0 64 64">
        <ellipse cx="32" cy="32" rx="20" ry="12" fill="lightgray"/>
        <ellipse cx="42" cy="32" rx="12" ry="10" fill="gray"/>
        <ellipse cx="22" cy="32" rx="12" ry="10" fill="gray"/>
      </svg>`;
  }
  return `
    <svg viewBox="0 0 64 64">
      <text x="10" y="35" font-size="18" fill="white">No icon</text>
    </svg>`;
}
