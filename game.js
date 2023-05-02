const canvas = document.querySelector(`#name`)
const game = canvas.getContext(`2d`);
const btnUp = document.querySelector(`#up`)
const btnLeft = document.querySelector(`#left`)
const btnRight = document.querySelector(`#right`)
const btnDown = document.querySelector(`#down`)
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

    const map = maps[0];
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

window.addEventListener(`keydown`, moveByKeys)
btnUp.addEventListener(`click`, moveUp)
btnLeft.addEventListener(`click`, moveLeft)
btnRight.addEventListener(`click`, moveRight)
btnDown.addEventListener(`click`, moveDown)

function moveByKeys(event) {
    if(event.key == `ArrowUp`) moveUp();
    if(event.key == `ArrowLeft`) moveLeft();
    if(event.key == `ArrowRight`) moveRight();
    if(event.key == `ArrowDown`) moveDown();  
}

function moveUp () {
console.log(`Me quiero mover hacia arriba`)
}

function moveLeft () {
    console.log(`Me quiero mover hacia la izquierda`)
}

function moveRight () {
    console.log(`Me quiero mover hacia la derecha`)
}

function moveDown () {
    console.log(`Me quiero mover hacia abajo`)
}