const home = document.getElementById("nav-home");
const statistics = document.getElementById("nav-statistics");
const compare_stats = document.getElementById("nav-compare-stats");

home.addEventListener("click", (event) => {
    window.location.href = "/home.html"
})

statistics.addEventListener("click", (event) => {
    window.location.href = "/statistics.html"
})

compare_stats.addEventListener("click", (event) => {
    window.location.href = "/compare-stats.html"
})