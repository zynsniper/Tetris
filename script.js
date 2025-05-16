const Rows = 20;
const Cols = 10;
ctx.scale(30,30);

let canvas = document.querySelector("#background");
let ctx = canvas.getContext("2d");
let scoreboard = document.querySelector("h2");
let grid = generateGrid();
let score = 0;
let pieceObj = null;

setInterval(newGameState, 500);
function newGameState(){
    checkGrid();
    if(!pieceObj){
        pieceObj = generateRandomPiece();
        renderPiece();
    }
    moveDown();
}

//======================================================================//
//SHAPES & COLOURS
//======================================================================//

const SHAPES = [
    [ //I shape
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [ //J shape
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [ //L shape
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [ //O shape
        [1,1],
        [1,1]
    ],
    [ //S shape
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [ //Z shape
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [ //T shape
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ]
]

const COLOURS = [
    "#0441ae",
    "#72cb3b",
    "#ffd504",
    "#ff971d",
    "#ff3215",
    "#80014d",
    "#569fb1"
]

//======================================================================//
//PIECE GENERATION FUNCTIONS
//======================================================================//

function generateRandomPiece(){
    let random = Math.floor(Math.random() * SHAPES.length);
    let piece = SHAPES[random];
    let pieceColour = COLOURS[random];
    let x = 4;
    let y = 0;

    return {piece, x, y, pieceColour};
}

function renderPiece(){
    let piece = pieceObj.piece;

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                ctx.fillStyle = pieceObj.pieceColour;
                ctx.fillRect(pieceObj.x + j, pieceObj.y + i, 1, 1);
            }
        }
    }
}

//======================================================================//
//MOVEMENT FUNCTIONS
//======================================================================//

function moveDown(){
    pieceObj.y += 1;
    renderGrid();
}

function rotate(){
    pieceObj.y += 1;
    renderGrid();
}

function moveLeft(){
    pieceObj.x -= 1;
    renderGrid();
}

function moveRight(){
    pieceObj.x += 1;
    renderGrid();
}

function collision(x, y){
    let piece = pieceObj.piece

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] != 1) continue;
            let p = x + j;
            let q = y + i;

            if(p < 0 || p >= Cols || q < 0 || q >= Rows || grid[q][p] > 0){
                return true;
            }
        }
    }
    return false;
}

//======================================================================//
//GAME/CANVAS DISPLAY FUNCTIONS
//======================================================================//

function generateGrid(){
    let grid = [];
    for(let i = 0; i < Rows; i++){
        grid.push([]);
        for(let j = 0; j < Cols; j++){
            grid[i].push(0);
        }
    }
    return grid;
}

function renderGrid(){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(j,i,1,1);
        }
    }
    renderPiece();
}

function checkGrid(){
    let count = 0;
    
    for(let i = 0; i < grid.length; i++){
        let filled = true;

        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] == 0){
                filled = false;
            }
        }

        if(filled){
            count++;
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
            i--;
        }
    }

    switch(count){
        case 1:
            score += 100;
            break;
        case 2:
            score += 300;
            break;
        case 3:
            score += 500;
            break;
        case 4:
            score += 800;
            break;
        default:
    }

    scoreboard.innerHTML = "Score: " + score;
    count = 0;
}

//======================================================================//
//======================================================================//
//======================================================================//

document.addEventListener("keydown", function(e){
    switch (e.key){
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            rotate();
            break;
    }
});
