const canvas = document.querySelector(`#name`)
const game = canvas.getContext(`2d`);

window.addEventListener(`load`,startGame)

function startGame() {
    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute(`width`, canvasSize)
    canvas.setAttribute(`height`, canvasSize)
    window.innerWidth
    window.innerHeight

    let elementSize = (canvasSize / 10) - 1;
    game.font = elementSize + `px Verdana`;
    game.textAlign = ``;

    for (let i = 0; i < 10; i++) {

        game.fillText(emojis[`X`], elementSize * i, elementSize)
        
    }
    

    /* game.fillRect(0,0,100,100)
    /* game.clearRect(0,0,50,50) */
  /*   game.clearRect(50,50,50,50) */ 
    /* game.fillStyle = `Blue`
    game.font = `20px Arial`
    game.textAlign = `center`
    game.fillText(`Juanma`,50,25); */
}