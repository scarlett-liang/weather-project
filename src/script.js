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
    h1.innerHTML = citySubmit.value;
  }
}

function searchWeather(city) {
  let apiKey = "af52e0b61c120c6390d319d4b6e5bb13";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchWeather(cityInputElement.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}
function showForecast(response) {
  let days = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecast">
          <div class="day">${formatDay(day.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            alt=""
            width="70px"
            class="iconForecast"
          />
          <div class="tempForecast">
            <span class="temp-max">${Math.round(
              day.temp.max
            )}º</span> <span class="temp-min">${Math.round(
          day.temp.min
        )}º</span>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
function getLocation(coordinate) {
  let newLat = coordinate.lat;
  let newLon = coordinate.lon;
  let apiKey = "af52e0b61c120c6390d319d4b6e5bb13";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${newLat}&lon=${newLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let tempUpdate = document.querySelector("#temp");
  tempUpdate.innerHTML = Math.round(response.data.main.temp);
  let locationUpdate = document.querySelector("h1");
  locationUpdate.innerHTML = response.data.name;
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
  getLocation(response.data.coord);
}

function autoLocate() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let apiKey = "af52e0b61c120c6390d319d4b6e5bb13";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let formSearch = document.querySelector("form");
formSearch.addEventListener("submit", showCity);
let clickSearchButton = document.querySelector("#search-button");
clickSearchButton.addEventListener("click", handleSubmit);
let clickAutoButton = document.querySelector("#auto-button");
clickAutoButton.addEventListener("click", autoLocate);
searchWeather("Frankfurt");
