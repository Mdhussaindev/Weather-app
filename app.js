const apiKey = "YOUR_API_KEY";

function showLoader(show){
  document.getElementById("loader").classList.toggle("hidden", !show);
}

/* MAIN WEATHER */

let city = cityInput || document.getElementById("city").value;
city = city.trim();
function getWeather(cityInput){

  let city = cityInput || document.getElementById("city").value;

  if(!city){
    alert("City enter karo 😅");
    return;
  }

  showLoader(true);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    showLoader(false);

    if(data.cod !== 200){
      document.getElementById("desc").innerText = "City not found";
      return;
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed + " km/h";

    let weather = data.weather[0].main;

    const icons = {
      Clear: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
      Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
      Rain: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
      Snow: "https://cdn-icons-png.flaticon.com/512/642/642000.png",
      Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"
    };

    let icon = document.getElementById("weatherIcon");
    icon.classList.remove("fade-img");
    void icon.offsetWidth; // restart animation
    icon.classList.add("fade-img");

    icon.src = icons[weather] || icons.Clear;

    getForecast(city);

  })
}

/* 5 DAY FORECAST */
function getForecast(city){

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(res => res.json())
  .then(data => {

    let box = document.getElementById("forecast");
    box.innerHTML = "";

    for(let i=0; i<data.list.length; i+=8){

      let day = data.list[i];

      box.innerHTML += `
        <div class="forecast-card">
          <p>${day.dt_txt.split(" ")[0]}</p>
          <p>${day.main.temp}°C</p>
        </div>
      `;
    }
  });
}

/* AUTO LOCATION */
function getLocationWeather(){

  navigator.geolocation.getCurrentPosition(pos => {

    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      getWeather(data.name);
    });

  });

}

/* DARK MODE */
function toggleMode(){
  document.body.classList.toggle("dark");
}