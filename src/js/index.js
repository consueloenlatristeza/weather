
//import {WeatherElement} from "./WeatherElement.class.js";
//customElements.define("weather", WeatherElement);

let temperature = 22;
async function getWeather(lat, long) {
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;

    const date = new Date();
    const date2 = new Date();
    date2.setDate(date2.getDate() + 5);
    const startDate = date.toISOString().split("T")[0];
    const endDate = date.toISOString().split("T")[0];
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m,relativehumidity_2m,weathercode,windspeed_10m`
    const response = await fetch(link);
    const weatherData = await response.json();

    const wId = date.getHours();
    temperature = weatherData.hourly["temperature_2m"][wId];
    document.getElementById("temp").innerText = temperature;

    const hum = weatherData.hourly["relativehumidity_2m"][wId];
    document.getElementById("hum").innerText = hum;

    const speed = weatherData.hourly["windspeed_10m"][wId];
    document.getElementById("speed").innerText = speed;
    
/*
    for(let i=1; i<6; i++) {
        const dateId = 24 * i + 1;
        const dateTemperature = weatherData.hourly["temperature_2m"][dateId];
        const day = "Monday";
        const type = "cloudy";
        const wEl = document.createElement("weather");
        wEl.build();
    }*/
}

async function getPlace(place) {
    const response = await fetch(`https://geocode.xyz/${place}?json=1&auth=135733115060413366028x34382`);
    const cityData = await response.json();
    if(cityData.error != null) {
        alert("The Place cannot be found!");
    }else {
        await getWeather(cityData.latt, cityData.longt);
        const city = cityData.city != null ? cityData.city : cityData.standard.city;
        const country = cityData.country ? cityData.country : cityData.standard.countryname;

        document.getElementById("city").innerHTML = `${city}, ${country}`;
    }
}

addEventListener("load", async function() {
    navigator.geolocation.getCurrentPosition(async function(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        await getPlace(`${lat},${long}`);
    });

    let date = new Date();
    const currentTime = date.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
    });
	document.getElementById("time").innerHTML = currentTime;

    document.getElementById("celsius").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temperature;
    });

    document.getElementById("fahrenheit").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = Math.round((temperature * 1.8 + 32) * 100) / 100;
    });


    const searchEl = document.getElementById("search");
    searchEl.addEventListener("keydown", async function(e) {
        if(e.key == "Enter") {
            const city = searchEl.value;
            await getPlace(city);
            searchEl.value = "";
        }
    });
});