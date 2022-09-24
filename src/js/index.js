
addEventListener("load", function() {
    const searchEl = document.getElementById("search");
    searchEl.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            const city = searchEl.value;
            document.getElementById("city").innerHTML = city;
            searchEl.value = "";
        }
    });
});