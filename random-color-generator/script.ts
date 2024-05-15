function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(): string {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

document.addEventListener("DOMContentLoaded", () => {
    const generateColorBtn = document.getElementById("generateColorBtn");
    
    if (generateColorBtn) {
        generateColorBtn.addEventListener("click", () => {
            const randomColor = getRandomColor();
            document.body.style.backgroundColor = randomColor;
        });
    }
});
