
addEventListener("load", function() {
    let time = new Date();
    var currentTime = date.getHours() + ":" + date.getMinutes();
	document.getElementById("time").innerHTML = currentTime;

    let temp = 22;

    document.getElementById("celcius").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temp;
    });

    document.getElementById("fahrenheit").addEventListener("click", function(e) {
        document.getElementById("temp").innerText = temp * 1.8 + 32;
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