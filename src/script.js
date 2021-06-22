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
let updateTime = document.querySelector("#time");
updateTime.innerHTML = getDate(new Date());

function showCity(event) {
  event.preventDefault();
  let citySubmit = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (citySubmit.value.length !== 0) {
    h1.innerHTML = `💗 ${citySubmit.value} 💗`;
  } else {
    h1.innerHTML = `💗 City name? 💗`;
    alert("Try type in a city name");
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
  let tempUpdate = document.querySelector("#temp");
  tempUpdate.innerHTML = Math.round(response.data.main.temp);
  let locationUpdate = document.querySelector("h1");
  locationUpdate.innerHTML = `💗 ${response.data.name} 💗`;
  console.log(response);
  let humidityUpdate = document.querySelector("#humidity");
  humidityUpdate.innerHTML = response.data.main.humidity;
  let windUpdate = document.querySelector("#wind");
  windUpdate.innerHTML = response.data.wind.speed;
  let descriUpdate = document.querySelector("#description");
  descriUpdate.innerHTML = response.data.weather[0].description;
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
