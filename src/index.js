let now = new Date();

let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];

let hour = now.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;

function todayDate() {
  return (
    day + " " + hour + ":" + minutes + "<br>" + month + " " + date + ", " + year
  );
}

let displayDate = document.querySelector("#date");
displayDate.innerHTML = todayDate();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let message = temperature;
  let temp = document.querySelector("#temp");
  temp.innerHTML = message;
  let cityName = response.data.name;
  let currentCity = cityName;
  let city = document.querySelector("#city");
  city.innerHTML = currentCity;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#cityName");
  let cityInput = document.querySelector("#city");
  cityInput.innerHTML = searchInput.value;
  let city = searchInput.value;
  let apiKey = "bc6d2694c7f4e9ac9094666861724dff";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  let currentTemp = document.querySelector("#temp");
  let currentTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = currentTemp.value;
  let currentCity = document.querySelector("#city");
  let city = response.data.name;
  currentCity.innerHTML = currentCity;
  let apiKey = "bc6d2694c7f4e9ac9094666861724dff";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let apiKey = "bc6d2694c7f4e9ac9094666861724dff";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

// ----------------------- Current Location Button Action ------------------------

let currentLocationBtn = document.querySelector("#location-form");
currentLocationBtn.addEventListener("click", onCurrentLocation);

function onCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// --------------------------------------------------------------------------------

// F and C
let temperature = document.querySelector("#temp");

function convertToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = 17;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = 63;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
