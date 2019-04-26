var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var p = 20;
var x = 0.5 + 12 * p;
var y = 0.5;
var floor = 600;
// var current = new Image();
// var images = ["s.png","l.png","line.png","t.png"]
// current.src = images[Math.floor(Math.random()*images.length)];
var w = 1200;
var h = 1600;
canvas.height = 800;
canvas.width = 600;
var line = { colour: "red", blocks: [[x, y],  [x, y - p],  [x, y - 2 * p],  [x, y - 3 * p]] };
var square = { colour: "yellow", blocks: [[x, y],  [x, y - p], [x - p, y],  [x - p, y - p] ]};
tetriminos = [line, square];
var current = JSON.parse(JSON.stringify(tetriminos[Math.floor(Math.random() * tetriminos.length)]));

var blocks = [];
ctx.fillStyle = "#FF0000";
// window.addEventListener('resize',function(){
//     var width  = calculateDesiredWidth();  // your code here
//     var height = calculateDesiredHeight(); // your code here
//     ctx.canvas.width  = w;
//     ctx.canvas.height = h;
// },false);
//test jenkins1
// ctx.fillRect(0,0, 100, 100);
// ctx.fillText("Hello", 10,10);
setInterval(downtick, 1000);
setInterval(refresh, 1000);

function refresh() {
    
    checkCollision();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawboard();
    drawCurrent();
    drawBlocks();
    // ctx.clearRect(0,0,800,800);

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

// function drawCurrent() {
//     ctx.drawImage(current,x,y,p*2,p*2);
//     let img = new Image();
//     img.src = current.src;

//     if(y==floor) {
//         block = {image:img,
//                     x:x,
//                     y:y    
//                 };
//         x=100;
//         y=10;
//         current.src= images[Math.floor(Math.random()*images.length)];
//         blocks.push(block);
//     }
//     console.log(blocks[0]);
// }

// function drawBlocks() {
//     for(let i=0;i<blocks.length;i++) {
//         ctx.drawImage(blocks[i].image,blocks[i].x,blocks[i].y,p*2,p*2);

//     }
// }

window.onkeydown = function (event) {
    if (event.keyCode == 37) {
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][0] -=p;
        }
        refresh();
    }
    if (event.keyCode == 39) {
        // current.one[0] += p;
        // current.two[0] += p;
        // current.three[0] += p;
        // current.four[0] += p;
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][0] +=p;
        }
        refresh();
    }
    if (event.keyCode == 40) {
        // current.one[1] = current.one[1] < floor - p ? current.one[1] + p : floor;
        // current.two[1] = current.two[1] < floor - p ? current.two[1] + p : floor;
        // current.three[1] = current.three[1] < floor - p ? current.three[1] + p : floor;
        // current.four[1] = current.four[1] < floor - p ? current.four[1] + p : floor;
        for(let i = 0; i <current.blocks.length;i++) {
            current.blocks[i][1] = current.blocks[i][1] < floor - p ?  current.blocks[i][1] + p : floor;
        }
        refresh();
    }
}

function downtick() {
    // current.one[1] = current.one[1] < floor - p ? current.one[1] + p : floor;
    // current.two[1] = current.two[1] < floor - p ? current.two[1] + p : floor;
    // current.three[1] = current.three[1] < floor - p ? current.three[1] + p : floor;
    // current.four[1] = current.four[1] < floor - p ? current.four[1] + p : floor;
    for(let i = 0; i <current.blocks.length;i++) {
        current.blocks[i][1] = current.blocks[i][1] < floor - p ?  current.blocks[i][1] + p : floor;
    }
    checkCollision();
}

function drawCurrent() {
    // ctx.fillRect(x,y,p,p);
    // ctx.fillRect(x,y+p,p,p);
    // ctx.fillRect(x,y+2*p,p,p);
    ctx.fillStyle = current.colour;
    // ctx.fillRect(current.one[0], current.one[1], p, p);
    // ctx.fillRect(current.two[0], current.two[1], p, p);
    // ctx.fillRect(current.three[0], current.three[1], p, p);
    // ctx.fillRect(current.four[0], current.four[1], p, p);
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
            // console.log(blocks[i].blocks[j][0]);
            // console.log(current.blocks[j][0]);
            // if(blocks[i].blocks[j][0]==current.blocks[j][0] && blocks[i].blocks[j][1]==current.blocks[j][1] ) {
            //     storeTetrimino(current);
            // }
            if(blocks[i].blocks[j].toString() == current.blocks[0].toString() || blocks[i].blocks[j].toString() == current.blocks[1].toString() || blocks[i].blocks[j].toString() == current.blocks[2].toString() || blocks[i].blocks[j].toString() == current.blocks[3].toString()) {
                storeTetrimino(current); }
            // for(let k = 0; k < blocks[i].blocks[j].length ;k++) {
            //     console.log(blocks[i].blocks[k].toString());
            //     if(blocks[i].blocks[j][k].toString() == current.blocks[0].toString() || blocks[i].blocks[j][k].toString() == current.blocks[1].toString() || blocks[i].blocks[j][k].toString() == current.blocks[2].toString() || blocks[i].blocks[j][k.toString()] == current.blocks[3].toString()) {
            //         storeTetrimino(current);
            //     }
            // }
        }
    }
}

function drawBlocks() {
    blocks.forEach(function (tetrimino) {
        ctx.fillStyle = tetrimino.colour;
        // ctx.fillRect(tetrimino.one[0], tetrimino.one[1], p, p);
        // ctx.fillRect(tetrimino.two[0], tetrimino.two[1], p, p);
        // ctx.fillRect(tetrimino.three[0], tetrimino.three[1], p, p);
        // ctx.fillRect(tetrimino.four[0], tetrimino.four[1], p, p);
        for(let i = 0; i<tetrimino.blocks.length;i++) {
            ctx.fillRect(tetrimino.blocks[i][0],tetrimino.blocks[i][1],p,p);
        }
    });
}