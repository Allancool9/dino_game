// board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dino 
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight,
}

//our cactus 
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;


let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8;// it negative so it moves left
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;




window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    // when I was testing my code for the axis of the dino
    // context.fillStyle ="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);
    
    context = board.getContext("2d")

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png"
    
    
    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png"


    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png"

    requestAnimationFrame(update)
    setInterval(placeCactus, 1000) // saying for every 100 milliseconds = 1 second
}

// this is used for drawing the frames for our game 
function update(){
    requestAnimationFrame(update);


    context.clearRect(0,0, board.width, board.height)
    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY) 

    context.drawImage(dinoImg, dino.x,dino.y,dino.width,dino.height);

    //cactus 
    for (let i = 0; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    }
}

function moveDino(e){
    if (gameOver) {
        return;
    }

    if (e.code === "Space" || e.code == "ArrowUp" && dino.y === dinoY) {
        //jump
        velocityY = -10;

    }
 
}
//generate our cactuses
 function placeCactus() {
 // place cactus 
 let cactus = {
    img : null,
    x : cactusX,
    y : cactusY,
    width : null,
    height : cactusHeight

}
    let placeCactusChance = Math.random();

    if (placeCactusChance > .90) /*10 percent */ {
       cactus.img = cactus3Img;
       cactus.width = cactus3Width;
       cactusArray.push(cactus);
    } 
    else if(placeCactusChance > .70) /* 30percent */ {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
     else if (placeCactusChance > .50)  /* 50 percent */ {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
     }
     // help us with storage 
     if(cactus.length > 5) {
        cactusArray.shift ();
     }
 }
 