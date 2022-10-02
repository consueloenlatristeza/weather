
let temperature = 22;
async function getWeather(lat, long) {
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    const response = await fetch(link);
    const weatherData = await response.json();

    const date = new Date();
    temperature = weatherData.hourly["temperature_2m"][date.getHours()];
    document.getElementById("temp").innerText = temperature;
}

async function getPlace(place) {
    const response = await fetch(`https://geocode.xyz/${place}?json=1&auth=135733115060413366028x34382`);
    const cityData = await response.json();
    if(cityData.error != null) {
        alert("The Place cannot be found!");
    }else {
        await getWeather(cityData.latt, cityData.longt);
        const city = cityData.city ? cityData.city : cityData.standard.city;
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
    var currentTime = date.getHours() + ":" + date.getMinutes();
	document.getElementById("time").innerHTML = currentTime;

    document.getElementById("celsius").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temperature;
    });

    document.getElementById("fahrenheit").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temperature * 1.8 + 32;
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