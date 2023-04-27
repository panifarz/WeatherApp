const API_KEY = "37c0c405c64e1f86767ea83f4db04b54";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayOfMonth = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${hours}:${minutes} 
  <br> ${month} ${dayOfMonth}, ${year}
  `;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 weatherBox">
                <div class="weatherForecastDay">${formatDay(
                  forecastDay.dt
                )}</div>
               
                <img
                  class="forecastIcon"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50"
                />
                <div class="weatherForecastTemp">
                  <span class="forecastMax">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecastMin">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  const {
    main: { temp, humidity },
    name,
    weather,
    wind: { speed },
    dt,
    coord,
  } = response.data;

  const { description, icon } = weather[0];

  document.querySelector("#temp").innerHTML = Math.round(temp);
  document.querySelector("#city").innerHTML = name;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = Math.round(speed);
  document.querySelector("#date").innerHTML = formatDate(dt * 1000);

  const weatherIconElement = document.querySelector("#weatherIcon");

  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  weatherIconElement.setAttribute("alt", description);

  getForecast(coord);
}

function search(city) {
  let apiKey = "bc6d2694c7f4e9ac9094666861724dff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityName");
  search(cityInputElement.value);
}

// --------------------------------------------------------------------------------

// F and C
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// ----------------------- Current Location Button  ------------------------

function showPosition(position) {
  const apiUrl = `${BASE_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationBtn = document.querySelector("#location-form");
currentLocationBtn.addEventListener("click", getCurrentLocation);
