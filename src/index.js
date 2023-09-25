let date = document.querySelector("#date");

let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let dayToday = currentDate.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

date.innerHTML = `${days[dayToday]} ${hours}:${minutes}`;

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

function showTemperature(response){
    let temperature = Math.round(response.data.temperature.current);
    let temp = document.querySelector(`#degrees`);
    temp.innerHTML= `${temperature}`;
    let humidity = document.querySelector(`#humidity-value`);
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    let windSpeed = document.querySelector(`#wind-value`);
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    let feelsLike = document.querySelector(`#estimated-temp`);
    feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}`;
    let precipitation = document.querySelector(`#precipitation-value`);
    precipitation.innerHTML = `${response.data.condition.description}`;
    let area = document.querySelector(`#city`);
    area.innerHTML = `${response.data.city}, ${response.data.country}`;
    let dateElement = document.querySelector(`#date`);
    dateElement.innerHTML = FormData(response.data.dt * 1000);
    let iconElement = document.querySelector(`#icon`);
    iconElement.setAttribute(`src`, `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute(`alt`, response.data.condition.description);
   console.log(response);
}


function getCity(event){
    event.preventDefault();
    let inputResult = document.querySelector(`#city-type`);
    let city = document.querySelector(`#city`);
    city.innerHTML= inputResult.value;

     let units = `metric`;
     let apiKey = '7a60f34o03cc2aad0d9321569btfb84b';
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputResult.value}&key=${apiKey}&units=${units}`;
     
     axios.get(apiUrl).then(showTemperature);
}

function getCurrentCity(response) {
 let temperature = Math.round(response.data.temperature.current);
    let temp = document.querySelector(`#degrees`);
    temp.innerHTML= `${temperature}`;
    let humidity = document.querySelector(`#humidity-value`);
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    let windSpeed = document.querySelector(`#wind-value`);
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    let feelsLike = document.querySelector(`#estimated-temp`);
    feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}`;
    let precipitation = document.querySelector(`#precipitation-value`);
    precipitation.innerHTML = `${response.data.condition.description}`;
    let area = document.querySelector(`#city`);
    area.innerHTML = `${response.data.city}, ${response.data.country}`;
    let iconElement = document.querySelector(`#icon`);
    iconElement.setAttribute(`src`, `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute(`alt`, response.data.condition.description);
    console.log(response);
}

function retrievePosition(position) {
  let apiKey = "7a60f34o03cc2aad0d9321569btfb84b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(getCurrentCity);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentCity = document.querySelector(`#current-btn`);
currentCity.addEventListener(`click`, retrievePosition);

let searchButton = document.querySelector(`#search-btn`);
searchButton.addEventListener("click", getCity);