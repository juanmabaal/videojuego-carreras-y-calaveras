const canvas = document.querySelector(`#name`)
const game = canvas.getContext(`2d`);
const btnUp = document.querySelector(`#up`)
const btnLeft = document.querySelector(`#left`)
const btnRight = document.querySelector(`#right`)
const btnDown = document.querySelector(`#down`)
const spanLives = document.querySelector(`#lives`)
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

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

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split(`\n`)
    const mapRowsCols = mapRows.map(row => row.trim().split(``))

    showLives();

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
        levelWin();    
    }

    const enemyColision = enemyPositions.find(enemy => { 
        const enemyColisionX = enemy.x == playerPosition.x;
        const enemyColisionY = enemy.y == playerPosition.y;
        return enemyColisionX && enemyColisionY;
    });

    if (enemyColision) {
        levelFail();
    }

    game.fillText(emojis[`PLAYER`], playerPosition.x, playerPosition.y);
}

function levelWin () {
    console.log("Subiste de Nivel");
    level ++;
    startGame();
}

function levelFail() {
    console.log("Chocaste contra un enemigo :(")
    lives --;

    if (lives <=0) {
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    alert(`Terminaste el juego, felicidades`)
}

function showLives() {

   const heartArray= Array(lives).fill(emojis[`HEART`]);
   console.log(heartArray)

   spanLives.innerHTML = ``
    heartArray.forEach(heart => spanLives.append(heart))

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
