let now = new Date();
let newDate = document.querySelector(`span.current-day`);

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
newDate.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response){
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector(`#degrees`);
    temp.innerHTML= `${temperature}`;
    let humidity = document.querySelector(`#humidity-value`);
    humidity.innerHTML = `${response.data.main.humidity}%`;
    let windSpeed = document.querySelector(`#wind-value`);
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    let feelsLike = document.querySelector(`#estimated-temp`);
    feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
     let area = document.querySelector(`#city`);
    area.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
   console.log(response);
}


function getCity(event){
    event.preventDefault();
    let inputResult = document.querySelector(`#city-type`);
    let city = document.querySelector(`#city`);
    city.innerHTML= inputResult.value;

     let units = `metric`;
     let apiKey = 'be81f193e065bf5feb2d944c7336968b';
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputResult.value}&appid=${apiKey}&units=${units}`;
     
     axios.get(apiUrl).then(showTemperature);
}

function getCurrentCity(response) {
  let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector(`#degrees`);
    temp.innerHTML= `${temperature}`;
    let humidity = document.querySelector(`#humidity-value`);
    humidity.innerHTML = `${response.data.main.humidity}%`;
    let windSpeed = document.querySelector(`#wind-value`);
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    let feelsLike = document.querySelector(`#estimated-temp`);
    feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
    let area = document.querySelector(`#city`);
    area.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    console.log(response);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getCurrentCity);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentCity = document.querySelector(`#current-btn`);
currentCity.addEventListener(`click`, retrievePosition);

let searchButton = document.querySelector(`#search-btn`);
searchButton.addEventListener("click", getCity);