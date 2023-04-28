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

    startGame();
}

function startGame() {

    console.log({canvasSize, elementSize})

    elementSize = (canvasSize / 10) - 1;
    game.font = elementSize + `px Verdana`;
    game.textAlign = ``;

    for (let i = 0; i < 10; i++) {

        game.fillText(emojis[`X`], elementSize * i, elementSize)
        
    }
    
}