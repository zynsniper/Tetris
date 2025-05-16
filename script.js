const Rows = 20;
const Cols = 10;

let canvas = document.querySelector("#background");
let ctx = canvas.getContext("2d");
ctx.scale(30,30);
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
    "#fff",
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
    let colourIndex = random + 1;
    let x = 4;
    let y = 0;

    return {piece, colourIndex, x, y};
}

function renderPiece(){
    let piece = pieceObj.piece;

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                ctx.fillStyle = COLOURS[pieceObj.colourIndex];
                ctx.fillRect(pieceObj.x + j, pieceObj.y + i, 1, 1);
            }
        }
    }
}

//======================================================================//
//MOVEMENT FUNCTIONS
//======================================================================//

function moveDown(){
    if(!collision(pieceObj.x, pieceObj.y + 1)){
        pieceObj.y += 1;
    }
    else{
        let piece = pieceObj.piece;

        for(let i = 0; i < piece.length; i++){
            for(let j = 0; j < piece[i].length; j++){
                if(piece[i][j] == 1){
                    let p = pieceObj.x + j;
                    let q = pieceObj.y + i;
                    grid[q][p] = pieceObj.colourIndex;
                }
            }
        }

        if(pieceObj.y == 0){
            alert("Game over!");
            grid = generateGrid();
            score = 0;
        }
        pieceObj = null;
    }
    renderGrid();
}

function rotate(){
    let rotatedPiece = [];
    let piece = pieceObj.piece;

    for(let i = 0; i < piece.length; i++){
        rotatedPiece.push([]);

        for(let j = 0; j < piece[i].length; j++){
            rotatedPiece[i].push(0);
        }
    }

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            rotatedPiece[i][j] = piece[j][i];
        }
    }

    for(let i = 0; i < rotatedPiece.length; i++){
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }

    if(!collision(pieceObj.x, pieceObj.y, rotatedPiece)){
        pieceObj.piece = rotatedPiece;
    }

    renderGrid()
}

function moveLeft(){
    if(!collision(pieceObj.x - 1, pieceObj.y))
        pieceObj.x -= 1;
    renderGrid();
}

function moveRight(){
    if(!collision(pieceObj.x + 1, pieceObj.y))
        pieceObj.x += 1;
    renderGrid();
}

function collision(x, y, rotatedPiece){
    let piece = rotatedPiece || pieceObj.piece;

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                let p = x + j;
                let q = y + i;

                if(p < 0 || p >= Cols || q < 0 || q >= Rows){
                    return true; 
                }

                if(grid[q][p] > 0){
                    return true; 
                }
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
            ctx.fillStyle = COLOURS[grid[i][j]];
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
    }

    scoreboard.innerHTML = "Score: " + score;
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
