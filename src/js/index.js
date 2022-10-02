
function getWeather(lat, long) {
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    const response = await fetch(link);
    const weatherData = await response.json();

    const date = new Date();
    temperature = weatherData.hourly["temperature_2m"][date.getHours()];
    document.getElementById("temp").innerText = temperature;
}

addEventListener("load", async function() {
    let temperature = 22;

    navigator.geolocation.getCurrentPosition(async function(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getWeather(lat, long);
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
            const response = await fetch(`https://geocode.xyz/${city}?json=1`)
            const cityData = await response.json();
            if(cityData.error != null) {
                alert("The Place cannot found!");
            }else {
                getWeather(cityData.latt, cityData.longt);
                document.getElementById("city").innerHTML = `${cityData.standard.city}, ${cityData.standard.countryname}`;
            }
            searchEl.value = "";
        }
    });
});