const canvas = document.querySelector(`#name`)
const game = canvas.getContext(`2d`);
let canvasSize;
let elementSize;

window.addEventListener(`load`,setCanvasSize)
window.addEventListener(`resize`,setCanvasSize)


function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute(`width`, canvasSize)
    canvas.setAttribute(`height`, canvasSize)

    elementSize = (canvasSize / 10) -1;
    startGame();
}

function startGame() {

    console.log({canvasSize, elementSize})
    game.font = elementSize + `px Verdana`;
    game.textAlign = ``;

    const map = maps[2];
    const mapRows = map.trim().split(`\n`)
    const mapRowsCols = mapRows.map(row => row.trim().split(``))

    mapRowsCols.forEach((row, rowI) => {
        row.forEach ((col, colI) => {
            const emoji = emojis [col]
            const posX = elementSize * colI * 0.99;
            const posY = elementSize * (rowI + 1) * 0.99;
            game.fillText(emoji,posX, posY)
        })
    });
    console.log({map, mapRows})

    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowsCols[row - 1][col - 1]], elementSize * (col-1) * 0.99, elementSize * row *0.99 );
        }
    } */
}