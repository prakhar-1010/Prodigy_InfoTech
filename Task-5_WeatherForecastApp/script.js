const apiKey = "95406681c91f6c4de999e2df00b70ab5";

async function getWeather() {
  const input = document.getElementById("locationInput").value.trim();

  if (!input) {
    alert("Please enter a city name or ZIP code.");
    return;
  }

  let lat, lon, cityName, country;

  try {
    if (/^\d{4,6}$/.test(input)) {
      const zipUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${input},in&appid=${apiKey}`;
      const zipRes = await fetch(zipUrl);
      const zipData = await zipRes.json();

      if (zipData.cod !== 200) {
        document.getElementById("weatherInfo").innerHTML = "❌ ZIP code not found.";
        return;
      }

      lat = zipData.coord.lat;
      lon = zipData.coord.lon;
      cityName = zipData.name;
      country = zipData.sys.country;

    } else {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.length) {
        document.getElementById("weatherInfo").innerHTML = "❌ City not found.";
        return;
      }

      lat = geoData[0].lat;
      lon = geoData[0].lon;
      cityName = geoData[0].name;
      country = geoData[0].country;
    }

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const current = forecastData.list[0];
    const weather = current.weather[0];

    const weatherHTML = `
      <h2>${cityName}, ${country}</h2>
      <p><strong>Condition:</strong> ${weather.main} (${weather.description})</p>
      <p><strong>Temperature:</strong> ${current.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${current.wind.speed} m/s</p>
    `;

    document.getElementById("weatherInfo").innerHTML = weatherHTML;

  } catch (error) {
    console.error(error);
    document.getElementById("weatherInfo").innerHTML = "⚠️ Error fetching weather data.";
  }
}
