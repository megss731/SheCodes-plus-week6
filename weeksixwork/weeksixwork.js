let city = document.querySelector("#city-search");
let changeCityTo = document.querySelector("#city");
let apiKey = "e89e31a1e21f0e5098fdecba081e5d67";
let now = new Date();
let time = `${now.getHours()}:${now.getMinutes()}`;
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

function dayOfWeek() {
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day}, ${time}`;
}
dayOfWeek();
function replaceCity(event) {
  event.preventDefault();
  changeCityTo.innerHTML = city.value;
  axios
    .get(`${apiUrl}${city.value}&units=imperial&appid=${apiKey}`)
    .then(changeTempCity);
}
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
function changeTempCity(response) {
  let replace = Math.round(response.data.main.temp);
  console.log(replace);
  let temperature = document.querySelector(".fahrenheit-main");
  temperature.innerHTML = replace;
}
let form = document.querySelector("form");
form.addEventListener("submit", replaceCity);
navigator.geolocation.getCurrentPosition(getCurrentLatLon);
function getCurrentLatLon(currentTemp) {
  let lat = currentTemp.coords.latitude;
  let lon = currentTemp.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(getCurrentTemp);
}
function getCurrentTemp(currentConditions) {
  let getLocalTemp = Math.round(currentConditions.data.main.temp);
  let localTemp = document.querySelector(".fahrenheit-main");
  localTemp.innerHTML = getLocalTemp;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(changeTempCity);
}
let currentButton = document.querySelector(".current-conditions");
currentButton.addEventListener("click", getCurrentLatLon);
