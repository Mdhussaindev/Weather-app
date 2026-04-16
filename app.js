const apiKey = "YOUR_API_KEY_HERE";

function getWeather() {

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = data.main.temp + "°C";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        // ICON CHANGE 🔥
        let weather = data.weather[0].main;
        let icon = document.getElementById("weatherIcon");

        switch(weather) {
            case "Clear":
                icon.src = "images/clear.png";
                break;

            case "Clouds":
                icon.src = "images/clouds.png";
                break;

            case "Rain":
                icon.src = "images/rain.png";
                break;

            case "Snow":
                icon.src = "images/snow.png";
                break;

            case "Mist":
                icon.src = "images/mist.png";
                break;

            default:
                icon.src = "images/clear.png";
        }

    })
    .catch(() => {
        alert("City not found ❌");
    });
}