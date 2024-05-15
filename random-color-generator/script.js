function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
}
document.addEventListener("DOMContentLoaded", function () {
    var generateColorBtn = document.getElementById("generateColorBtn");
    if (generateColorBtn) {
        generateColorBtn.addEventListener("click", function () {
            var randomColor = getRandomColor();
            document.body.style.backgroundColor = randomColor;
        });
    }
});
