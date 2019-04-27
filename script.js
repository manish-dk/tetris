var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var p = 20;
var x = 0.5 + 12 * p;
var y = 0.5;
var floor = 0.5 + 30 * p;
canvas.height = 800;
canvas.width = 600;

//tetrominos
var line = {state: 1, colour: "red", blocks: [[x, y], [x, y - p], [x, y - 2 * p], [x, y - 3 * p]] };
var square = { colour: "yellow", blocks: [[x, y], [x, y - p], [x - p, y], [x - p, y - p]] };
var t = {state: 1,colour: "aqua", blocks: [[x, y], [x, y - p], [x - p, y - p], [x + p, y - p]] };
var s = {state: 1, colour: "aquamarine", blocks: [[x, y], [x, y - p], [x - p, y], [x + p, y - p]] };
var z = {state: 1, colour: "greenyellow", blocks: [[x, y], [x, y - p], [x + p, y], [x - p, y - p]] };
var l = { state: 1,colour: "pink", blocks: [[x, y], [x, y - p], [x, y - 2 * p], [x + p, y]] };
var j = { state: 1,colour: "orange", blocks: [[x, y], [x, y - p], [x, y - 2 * p], [x - p, y]] };

var tetroState = 1;
var tetrominos = [line, square, t, s, z, l, j];
// var tetrominos = [j];
var current = JSON.parse(JSON.stringify(tetrominos[Math.floor(Math.random() * tetrominos.length)]));

var past = [];

setInterval(downtick, 1000);
setInterval(refresh, 1000);

function refresh() {

    checkCollision();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawboard();
    drawCurrent();
    drawPast();

}

function drawboard() {
    ctx.beginPath();
    ctx.lineWidth = 0.01;
    for (let start = 0; start < canvas.width; start += p) {
        ctx.moveTo(start + 0.5, 0.5);
        ctx.lineTo(start, canvas.height);
        ctx.strokeStyle = "grey";

        ctx.stroke();
    }
    for (let start = 0; start < canvas.height; start += p) {
        ctx.moveTo(0.5, start + 0.5);
        ctx.lineTo(canvas.width, start);
        ctx.strokeStyle = "grey";
        ctx.stroke();
    }

}


window.onkeydown = function (event) {
    if (event.keyCode == 38) {
        rotate();
        refresh();
        
    }
    if (event.keyCode == 37) {
        if (!checkMove(-1)) return;
        for (let i = 0; i < current.blocks.length; i++) {
            current.blocks[i][0] -= p;
        }
        refresh();
    }
    if (event.keyCode == 39) {
        if (!checkMove(1)) return;
        for (let i = 0; i < current.blocks.length; i++) {
            current.blocks[i][0] += p;
        }
        refresh();
    }
    if (event.keyCode == 40) {
        for (let i = 0; i < current.blocks.length; i++) {
            current.blocks[i][1] = current.blocks[i][1] < floor - p ? current.blocks[i][1] + p : floor;
        }
        refresh();
    }
}


function downtick() {
    for (let i = 0; i < current.blocks.length; i++) {
        current.blocks[i][1] = current.blocks[i][1] < floor - p ? current.blocks[i][1] + p : floor;
    }
    checkCollision();
}

function drawCurrent() {
    ctx.fillStyle = current.colour;
    for (let i = 0; i < current.blocks.length; i++) {
        ctx.fillRect(current.blocks[i][0], current.blocks[i][1], p, p);
    }
}

function storetetromino(tetromino) {
    past.push(tetromino);
    tetroState=1;
    current = JSON.parse(JSON.stringify(tetrominos[Math.floor(Math.random() * tetrominos.length)]));
}

function checkCollision() {

    for (let i = 0; i < past.length; i++) {
        for (let j = 0; j < past[i].blocks.length; j++) {
            if (past[i].blocks[j][0] == current.blocks[0][0] && past[i].blocks[j][1] == current.blocks[0][1] + p
                || past[i].blocks[j][0] == current.blocks[1][0] && past[i].blocks[j][1] == current.blocks[1][1] + p
                || past[i].blocks[j][0] == current.blocks[2][0] && past[i].blocks[j][1] == current.blocks[2][1] + p
                || past[i].blocks[j][0] == current.blocks[3][0] && past[i].blocks[j][1] == current.blocks[3][1] + p) {
                    storetetromino(current);
            }
        }
    }
    for (let i = 0; i < current.blocks.length; i++) {
        if (current.blocks[i][1] == floor) {
            storetetromino(current);
        }
    }
}

function checkMove(x) {
    for (let i = 0; i < past.length; i++) {
        for (let j = 0; j < past[i].blocks.length; j++) {
            if (past[i].blocks[j][0] == current.blocks[0][0] + x*p && past[i].blocks[j][1] == current.blocks[0][1]
                || past[i].blocks[j][0] == current.blocks[1][0] + x*p && past[i].blocks[j][1] == current.blocks[1][1]
                || past[i].blocks[j][0] == current.blocks[2][0] + x*p && past[i].blocks[j][1] == current.blocks[2][1]
                || past[i].blocks[j][0] == current.blocks[3][0] + x*p && past[i].blocks[j][1] == current.blocks[3][1]) {
                return false;
            }
        }
    }
    return true;
}


function drawPast() {
    past.forEach(function (tetromino) {
        ctx.fillStyle = tetromino.colour;
        for (let i = 0; i < tetromino.blocks.length; i++) {
            ctx.fillRect(tetromino.blocks[i][0], tetromino.blocks[i][1], p, p);
        }
    });
}

function rotate() {
    if(current.colour=="red") {
        if(current.state == 1) {
            current.blocks[0][0]-=p; 
            current.blocks[0][1]-=p;
            current.blocks[2][0]+=p;
            current.blocks[2][1]+=p;
            current.blocks[3][0]+=2*p;
            current.blocks[3][1]+=2*p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[0][0]+=p;
            current.blocks[0][1]+=p;
            current.blocks[2][0]-=p;
            current.blocks[2][1]-=p;
            current.blocks[3][0]-=2*p;
            current.blocks[3][1]-=2*p;
            current.state=1;
            }
        
    }
    if(current.colour=="aqua") {
        if(current.state == 1) {
            current.blocks[0][1]-=2*p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[3][0]-=p;
            current.blocks[3][1]+=p;
            current.state=3;
            }
        else if(current.state == 3) {
            current.blocks[2][0]+=2*p;
            current.state=4;
            }
        else if(current.state == 4) {
            current.blocks[0][1]+=2*p;
            current.blocks[3][0]+=p;
            current.blocks[3][1]-=p;
            current.blocks[2][0]-=2*p;
            current.state=1;
            }
        
    }

    if(current.colour=="aquamarine") {
        if(current.state == 1) {
            current.blocks[2][1]-=p; 
            current.blocks[3][0]-=2*p;
            current.blocks[3][1]-=p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[2][1]+=p; 
            current.blocks[3][0]+=2*p;
            current.blocks[3][1]+=p;
            current.state=1;
            }
        
    }
    if(current.colour=="greenyellow") {
        if(current.state == 1) {
            current.blocks[2][1]-=2*p; 
            current.blocks[3][0]+=2*p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[2][1]+=2*p; 
            current.blocks[3][0]-=2*p;
            current.state=1;
            }
        
    }
    if(current.colour=="pink") {
        if(current.state == 1) {
            current.blocks[3][1]-=2*p;
            current.blocks[3][0]-=2*p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[3][1]+=p;
            current.blocks[3][0]+=2*p;
            current.blocks[2][1]+=p;
            current.blocks[2][0]+=2*p;
            current.state=3;
            }
        else if(current.state == 3) {
            current.blocks[3][1]+=p;
            current.blocks[3][0]-=3*p;
            current.blocks[2][1]+=p;
            current.blocks[2][0]-=3*p;
            current.state=4;
            }
        else if(current.state == 4) {
            current.blocks[3][0]+=3*p;
            current.blocks[2][0]+=p;
            current.blocks[2][1]-=2*p;
            current.state=1;
            }
        
    }
    if(current.colour=="orange") {
        if(current.state == 1) {
            current.blocks[3][0]+=2*p;
            current.blocks[2][1]+=2*p;
            current.blocks[2][0]+=2*p;
            current.state=2;
        }
        else if(current.state == 2) {
            current.blocks[2][1]-=2*p;
            current.blocks[2][0]-=2*p;
            current.blocks[3][1]-=2*p;
            current.state=3;
            }
        else if(current.state == 3) {
            current.blocks[2][1]+=p;
            current.blocks[2][0]-=2*p;
            current.blocks[3][1]+=p;
            current.blocks[3][0]-=2*p;
            current.state=4;
            }
        else if(current.state == 4) {
            current.blocks[3][1]+=p;
            current.blocks[2][1]-=p;
            current.blocks[2][0]+=2*p;
            current.state=1;
            }
        
    }
    
}
