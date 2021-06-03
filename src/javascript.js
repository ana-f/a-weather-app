//hour, weekday

let date = new Date();
let currentHour = document.querySelector(".hour");
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentHour.innerHTML = `${hour}h${minutes}`;

let weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = weekDays[date.getDay()];
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = `${day}`;

//search engine

function displayWeather(response) {
  console.log(response.data);
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".weather-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".wind").innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `humidity: ${response.data.main.humidity}%`;
}

function search(city) {
  let apiKey = "031b9daf6c535f08d9a6bdcd27cd718d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cities").value;
  search(city);
}

let newCity = document.querySelector("form");
newCity.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "031b9daf6c535f08d9a6bdcd27cd718d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Lisbon");
