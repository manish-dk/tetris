var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var p = 20;
var x = 0.5 + 12 * p;
var y = 0.5;
var floor = 600;
var w = 1200;
var h = 1600;
canvas.height = 800;
canvas.width = 600;
var line = { colour: "red", blocks: [[x, y],  [x, y - p],  [x, y - 2 * p],  [x, y - 3 * p]] };
var square = { colour: "yellow", blocks: [[x, y],  [x, y - p], [x - p, y],  [x - p, y - p] ]};
var tetriminos = [line, square];
var current = JSON.parse(JSON.stringify(tetriminos[Math.floor(Math.random() * tetriminos.length)]));

var blocks = [];
ctx.fillStyle = "#FF0000";
setInterval(downtick, 1000);
setInterval(refresh, 1000);

function refresh() {
    
    checkCollision();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawboard();
    drawCurrent();
    drawBlocks();

}

function drawboard() {
    ctx.beginPath();
    ctx.lineWidth = 0.01;
    for (let start = 0; start < w; start += p) {
        ctx.moveTo(start + 0.5, 0.5);
        ctx.lineTo(start, h);
        ctx.strokeStyle = "grey";

        ctx.stroke();
    }
    for (let start = 0; start < h; start += p) {
        ctx.moveTo(0.5, start + 0.5);
        ctx.lineTo(w, start);
        ctx.strokeStyle = "grey";
        ctx.stroke();
    }

}


window.onkeydown = function (event) {
    if (event.keyCode == 37) {
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][0] -=p;
        }
        refresh();
    }
    if (event.keyCode == 39) {
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][0] +=p;
        }
        refresh();
    }
    if (event.keyCode == 40) {
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][1] = current.blocks[i][1] < floor - p ?  current.blocks[i][1] + p : floor;
        }
        refresh();
    }
}

function downtick() {
    for(let i = 0; i <current.blocks.length;i++) {
        current.blocks[i][1] = current.blocks[i][1] < floor - p ?  current.blocks[i][1] + p : floor;
    }
    checkCollision();
}

function drawCurrent() {
    ctx.fillStyle = current.colour;
    for(let i = 0; i<current.blocks.length;i++) {
        ctx.fillRect(current.blocks[i][0],current.blocks[i][1],p,p);
    }
}

function storeTetrimino(tetrimino) {
    blocks.push(tetrimino);
    current = JSON.parse(JSON.stringify(tetriminos[Math.floor(Math.random() * tetriminos.length)]));
}

function checkCollision() {
    for(let i = 0; i<current.blocks.length;i++) {
        if(current.blocks[i][1]==floor) {
            storeTetrimino(current);
        }
    }
    for(let i = 0; i < blocks.length; i++) {
        for(let j = 0; j < blocks[i].blocks.length;j++) {
            if(blocks[i].blocks[j].toString() == current.blocks[0].toString() || blocks[i].blocks[j].toString() == current.blocks[1].toString() || blocks[i].blocks[j].toString() == current.blocks[2].toString() || blocks[i].blocks[j].toString() == current.blocks[3].toString()) {
                storeTetrimino(current); }
        }
    }
}

function drawBlocks() {
    blocks.forEach(function (tetrimino) {
        ctx.fillStyle = tetrimino.colour;
        for(let i = 0; i<tetrimino.blocks.length;i++) {
            ctx.fillRect(tetrimino.blocks[i][0],tetrimino.blocks[i][1],p,p);
        }
    });
}