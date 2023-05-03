const canvas = document.querySelector(`#name`)
const game = canvas.getContext(`2d`);
const btnUp = document.querySelector(`#up`)
const btnLeft = document.querySelector(`#left`)
const btnRight = document.querySelector(`#right`)
const btnDown = document.querySelector(`#down`)
let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}
let enemyPositions = [];

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

    elementSize = (canvasSize / 10)-1;
    startGame();
}

function startGame() {

    console.log({canvasSize, elementSize})
    game.font = elementSize + `px Verdana`;
    game.textAlign = ``;

    const map = maps[0];
    const mapRows = map.trim().split(`\n`)
    const mapRowsCols = mapRows.map(row => row.trim().split(``))

    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowsCols.forEach((row, rowI) => {
        row.forEach ((col, colI) => {
            const emoji = emojis [col]
            const posX = elementSize * colI ;
            const posY = elementSize * (rowI + 1) ;
            game.fillText(emoji,posX, posY)

            if (col == `O`){
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition})
                }
            }else if (col == `I`) {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if (col == `X`){
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }
        })
    });

    movePlayer();    
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

function movePlayer() {
    const giftColisonX = playerPosition.x == giftPosition.x;
    const giftColisionY= playerPosition.y == giftPosition.y;
    const giftColision = giftColisonX && giftColisionY;

    if (giftColision) {
        console.log("Subiste de Nivel")
    }

    const enemyColision = enemyPositions.find(enemy => { 
        const enemyColisionX = enemy.x == playerPosition.x;
        const enemyColisionY = enemy.y == playerPosition.y;
        return enemyColisionX && enemyColisionY;
    });

    if (enemyColision) {
        console.log("Chocaste contra un enemigo :(")
    }

    game.fillText(emojis[`PLAYER`], playerPosition.x, playerPosition.y);
}

function moveUp () {
console.log(`Me quiero mover hacia arriba`)
if ((playerPosition.y - elementSize) <= 0) {
    console.log(`OUT`)
}else {
    playerPosition.y -= elementSize
    startGame();
}
}

function moveLeft () {
    console.log(`Me quiero mover hacia la izquierda`)
    if ((playerPosition.x -elementSize) < 0) {
        console.log(`OUT`)
    }else {
    playerPosition.x -= elementSize
    startGame();
}
}

function moveRight () {
    console.log(`Me quiero mover hacia la derecha`)
    if ((playerPosition.x + elementSize) > (canvasSize - elementSize)) {
        console.log(`OUT`)
    }else {
    playerPosition.x += elementSize
    startGame();
    }
}

function moveDown () {
    console.log(`Me quiero mover hacia abajo`)
    if((playerPosition.y + elementSize) > canvasSize){
        console.log(`OUT`)
    }else {
        playerPosition.y += elementSize
        startGame(); 
    }
}
