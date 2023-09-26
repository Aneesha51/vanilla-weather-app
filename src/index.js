function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector(`#weather-forecast`);

let forecastHTML = `<div class="row card-row">`;
let days = ["Thu", "Fri", "Sat", "Sun"];
days.forEach(function(days){
forecastHTML = forecastHTML + 
` <div class="col-2">
    <h5 class="card-title">${days}</h5>
    <div class="card-weather">
        <div class="card-body">
            <p class="text-weather">
                <img src="images/clear-sky-day.png" alt="Clear Sky"
                    class="weather-image" width="33">
                <br>
            <div class="max-temp">23
                <span class="icon">°</span>
                 
                <span class="min-temp"> 7
                    <span class="icon">°</span>
            </div>
            </p>
        </div>
    </div>
</div>
`;
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
// console.log(forecast);
}


function getForecast(coordinates) {
  console.log(coordinates);
  let key = "134c0b4acf34377o900e12t15499b4ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;
  console.log(apiUrl)
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

   

    let iconElement = document.querySelector(`#icon`);
    iconElement.setAttribute(`src`, `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute(`alt`, response.data.condition.description);

   celsiusTemperature = response.data.temperature.current;
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

    celsiusTemperature = response.data.temperature.current;
}

function retrievePosition(position) {
  let apiKey = "7a60f34o03cc2aad0d9321569btfb84b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(getCurrentCity);
}

function displayfahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(`#degrees`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector(`#degrees`);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}


let celsiusTemperature = null;

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentCity = document.querySelector(`#current-btn`);
currentCity.addEventListener(`click`, retrievePosition);

let searchButton = document.querySelector(`#search-btn`);
searchButton.addEventListener("click", getCity);

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, displayfahrenheitTemperature);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener(`click`, displayCelsiusTemperature);

displayForecast();