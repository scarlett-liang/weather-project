function getDate(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[now.getDay()]} ${hour}:${minute}`;
}

function showCity(event) {
  event.preventDefault();
  let citySubmit = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (citySubmit.value.length !== 0) {
    h1.innerHTML = `💗 ${citySubmit.value} 💗`;
  } else {
    h1.innerHTML = `💗 City name? 💗`;
  }
}
let formSearch = document.querySelector("form");
formSearch.addEventListener("submit", showCity);

function searchWeather() {
  let apiKey = "af52e0b61c120c6390d319d4b6e5bb13";
  let cityInput = document.getElementById("city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let tempUpdate = document.querySelector("#temp");
  tempUpdate.innerHTML = Math.round(response.data.main.temp);
  let locationUpdate = document.querySelector("h1");
  locationUpdate.innerHTML = `💗 ${response.data.name} 💗`;
  let humidityUpdate = document.querySelector("#humidity");
  humidityUpdate.innerHTML = response.data.main.humidity;
  let windUpdate = document.querySelector("#wind");
  windUpdate.innerHTML = response.data.wind.speed;
  let descriUpdate = document.querySelector("#description");
  descriUpdate.innerHTML = response.data.weather[0].description;
  let updateTime = document.querySelector("#time");
  updateTime.innerHTML = getDate(new Date(response.data.dt * 1000));
  let iconUpdate = document.querySelector("#icon");
  iconUpdate.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconUpdate.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].main}@2x.png`
  );
}
let clickSearchButton = document.querySelector("#search-button");
clickSearchButton.addEventListener("click", searchWeather);

function AutoLocate() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let apiKey = "af52e0b61c120c6390d319d4b6e5bb13";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let clickAutoButton = document.querySelector("#auto-button");
clickAutoButton.addEventListener("click", AutoLocate);

function showFahren(event) {
  event.preventDefault();
  fahrenLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempUpdate = document.querySelector("#temperature");
  let currentFahren = Math.round((celsiusTemp * 9) / 5 + 32);
  tempUpdate.innerHTML = `${currentFahren}ºF`;
}
function showCelsius(event) {
  event.preventDefault();
  fahrenLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempUpdate = document.querySelector("#temperature");
  tempUpdate.innerHTML = `${celsiusTemp}ºC`;
}

let celsiusTemp = null;
let fahrenLink = document.querySelector("#fahrenheit");
fahrenLink.addEventListener("click", showFahren);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
