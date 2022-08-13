const API_KEY = "1af9314497443ac739cced077296c089";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = `${data.name} /`;
      weather.innerText = data.weather[0].main;
    });
}

function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
