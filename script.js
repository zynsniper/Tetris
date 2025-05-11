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
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [ //Z shape
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [ //T shape
        [0,0,0],
        [1,1,1],
        [0,1,0]
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

const Rows = 20;
const Cols = 10;

let canvas = document.querySelector("#tetris");
let ctx = canvas.getContext("2d");
ctx.scale(30,30);

var pieceObj = generateRandomPiece();
console.log(pieceObj);
function generateRandomPiece(){
    let random = Math.floor(Math.random() * SHAPES.length);
    let piece = SHAPES[random];
    let pieceColour = COLOURS[random];
    let x = 4;
    let y = 0;

    return {piece, x, y, pieceColour};
}
renderPiece();
function renderPiece(){
    let piece = pieceObj.piece;
    ctx.fillStyle = pieceObj.pieceColour;

    for(let i = 0; i < piece.length; i++){
        for(let j = 0; j < piece[i].length; j++){
            if(piece[i][j] == 1){
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
}