
addEventListener("load", function() {
    let date = new Date();
    var currentTime = date.getHours() + ":" + date.getMinutes();
	document.getElementById("time").innerHTML = currentTime;

    let temperature = 22;

    document.getElementById("celsius").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temperature;
    });

    document.getElementById("fahrenheit").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temperature * 1.8 + 32;
    });


    const searchEl = document.getElementById("search");
    searchEl.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            const city = searchEl.value;
            document.getElementById("city").innerHTML = city;
            searchEl.value = "";
        }
    });
});